const { v4 : uuidv4 } = require('uuid');
const  { validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next)=> {
    let users;
    try{
        users = await User.find({}, '--password'); // or ({},'email name') exclude password

    } catch(error){
        return next(new HttpError('Something went wrong while fetching users, please try again.', 500));
    }
    res.json({ users });
};

const signUp = async (req, res, next)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next( new HttpError('Please provide valid data.', 422));
    }
    
    const { email, name, password } = req.body;
    let createdUser;
    try{
        let existingUser = await User.findOne({ email });
        if(existingUser){
            return next( new HttpError('User already exist, please use different email for signup.', 422));
        }
        createdUser = new User({
            email,
            name,
            password,
            image: 'https://live.staticflickr.com/7631/26849088292_36fc52ee90_b.jpg',
            places: []
        });

        await createdUser.save();

    }catch(error){
        return next(new HttpError('Something went wrong while creating user, please try again.', 500));
    }

    res.status(201).json({ user: createdUser });
}

const signIn = async (req, res, next)=> {
    
    const { email, password } = req.body;
    let foundUser;
    try{
        foundUser = await User.findOne({email});
        if(!foundUser || foundUser.password !== password){
            return next(new HttpError('Invalid email/password combination', 401));
        }
    } catch(err){
        return next(new HttpError('Something went wrong, please sign in again.', 500));
    }
    
    res.json({ message: 'logged in', user: foundUser });
}

exports.getUsers = getUsers;
exports.signUp = signUp;
exports.signIn = signIn;