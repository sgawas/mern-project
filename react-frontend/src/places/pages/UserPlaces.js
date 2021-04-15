import React from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';

const DUMMY_PLACES = [
    // {
    //     id: 'p1',
    //     title: 'Empire State Building',
    //     description: 'One of the Larget Sky Scraper in the world',
    //     address: '20 W 34TH ST, NEW YORK, NY 10001, USA',
    //     image: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Empire_State_Building_during_sunset.jpg',
    //     creator: 'u1',
    //     location: {
    //         lat: 40.7484405,
    //         lng: -73.9878531
    //     }
    // },
    // {
    //     id: 'p2',
    //     title: 'Empire State Building',
    //     description: 'One of the Larget Sky Scraper in the world',
    //     address: '20 W 34TH ST, NEW YORK, NY 10001, USA',
    //     image: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Empire_State_Building_during_sunset.jpg',
    //     creator: 'u2',
    //     location: {
    //         lat: 40.7484405,
    //         lng: -73.9878531
    //     }
    // }
];

const UserPlaces = () => {
    const userId = useParams().userId;
    const filteredPlaces = DUMMY_PLACES.filter(place=> place.creator === userId);
    return <PlaceList items={filteredPlaces} />;
}

export default UserPlaces;