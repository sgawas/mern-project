const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../utils/location');
const Place = require('../models/place');
const User = require('../models/user');

const getPlaceById = async (req, res, next) => {
    const { placeId } = req.params;
    console.log('get request from places routes');
    let place;
    try{
        place = await Place.findById(placeId); // does not return promise
        if(!place){
            // const error = new Error('Could not find place for provided id.');
            // error.code = 404;
            // throw error;
            return next(new HttpError('Could not find place for provided id.', 404));
        }
    }catch(err) {
        return next(new HttpError('Something went wrong, please try again.', 500));
    };

    
    res.json({ place });
};

const getPlacesByUserId = async (req, res, next)=> {
    const { userId } = req.params;

    //let places; 
    let userWithPlaces;
    try {
        //places = await Place.find({ creator: userId});
        userWithPlaces = await User.findById(userId).populate('places');
    } catch(err){
        return next(new HttpError('Something went wrong, please try again.', 500));
    };

    //if(!places || places.length === 0){
    if(!userWithPlaces || userWithPlaces.places.length === 0){
        return next(new HttpError('Could not find place(s) for provided user id.', 404));
    }
    res.json({ places: userWithPlaces.places });
};

const createPlace = async (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new HttpError('Please provide valid data.', 422));
    }

    const { title, description, address, creator } = req.body;

    let coordinates;
    try {
        coordinates = await getCoordsForAddress(address);
    } catch(error){
        return next(error);
    }

    const createdPlace = new Place({
        title,
        description,
        address,
        creator,
        location: coordinates,
        image: 'http://image.com'
    });
    let user;
    try{
        user = await User.findById(creator);
    }
    catch(err){
        return next(new HttpError('Something went wrong while looking for user id in database.', 500));
    };

    if(!user){
        return next(new HttpError('Could not find user for provider id.', 404));
    }
    console.log(user)
    try{
        const sess = await mongoose.startSession();
        sess.startTransaction();
        await createdPlace.save({session: sess});
        user.places.push(createdPlace);
        await user.save({ session: sess });
        await sess.commitTransaction();
    }catch(err) {
        return next(new HttpError('Could not save new place to database. Please try again.', 500));
    };
    
    res.status(201).json({ place: createdPlace});
};

const updatePlaceById = async (req, res, next) => {
    const { placeId } = req.params;
    const {title, description } = req.body;
    let place;
    try{
        //place = await Place.findByIdAndUpdate(placeId, { title, description } );
        place = await Place.findById(placeId);
        
        if(!place){
            return next(new HttpError('Could not find place for provided id.', 404));
        }
        place.title = title,
        place.description = description;
        await place.save();
    }catch(err) {
        return next(new HttpError('Something went wrong, please try again.', 500));
    };

    res.status(200).json({ place });
};

const deletePlaceById = async (req, res, next) => {
    const { placeId } = req.params;
    let place;
    try{
        place = await Place.findById(placeId).populate('creator');
    }
    catch(err){
        return next(new HttpError('Something went wrong, while trying to find place. Please try again.', 500));
    }
    
    if(!place){
        return next(new HttpError('Could not find place for provided id.', 404));
    }
    
    try{
        let session = await mongoose.startSession();
        session.startTransaction();
        await place.remove({ session });
        place.creator.places.pull(place);
        await place.creator.save({ session });
        await session.commitTransaction();
    } catch(err){
        return next(new HttpError('Something went wrong, while deleting a place. Please try again.', 500));
    }

    res.status(200).json({ message: 'Place deleted.'});
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlaceById = deletePlaceById;