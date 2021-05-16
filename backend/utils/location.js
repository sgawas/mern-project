const axios = require('axios');
const HttpError = require('../models/http-error');

const API_KEY = 'AIzaSyDeZ4nl7Mi0mC-_1VvCiNfncM951CZ9R3c';


async function getCoordsForAddress( address ){
    const response = await axios(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`);

    const data = response.data;

    if(!data || data.status === 'ZERO_RESULTS' ){
        throw new HttpError('Could not find location for provided address', 422);
    }
    const coordinates = data.results[0].geometry.location;

    return coordinates;
}

module.exports = getCoordsForAddress;