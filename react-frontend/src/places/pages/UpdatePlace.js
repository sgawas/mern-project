import React from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';

const DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State Building',
        description: 'One of the Larget Sky Scraper in the world',
        address: '20 W 34TH ST, NEW YORK, NY 10001, USA',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Empire_State_Building_during_sunset.jpg',
        creator: 'u1',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        }
    },
    {
        id: 'p2',
        title: 'Empire State Building',
        description: 'One of the Larget Sky Scraper in the world',
        address: '20 W 34TH ST, NEW YORK, NY 10001, USA',
        image: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Empire_State_Building_during_sunset.jpg',
        creator: 'u2',
        location: {
            lat: 40.7484405,
            lng: -73.9878531
        }
    }
];

const UpdatePlace = () => {
    const placeId = useParams().placeId;
    const placeFound = DUMMY_PLACES.find(p=> p.id === placeId);
    console.log(placeFound);
    
    const [ formState, inputHandler ] = useForm({
        title: {
            value: placeFound.title,
            isValid: true
        },
        description: {
            value: placeFound.description,
            isValid: true
        }
    }, true);

    if(!placeFound){
        return (
        <div className="center">
            <h2>Could not find place!</h2>
        </div>);
    }
    
    const updateFormSubmitHandler = event => {
        event.preventDefault();
        console.log(formState);
    }

    console.log(formState);
    return (
        <form className="place-form" onSubmit={updateFormSubmitHandler}>
            <Input
                id="title"
                element="input" 
                type="text" 
                label="Title" 
                errorText="Title required. Please enter valid title."
                validators={[ VALIDATOR_REQUIRE() ]}
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="description"
                element="textarea" 
                label="Description" 
                errorText="Please enter description with minimum 5 characters."
                validators={[ VALIDATOR_MINLENGTH(5) ]}
                onInput={inputHandler}
                initialValue={formState.inputs.description.value}
                initialValid={formState.inputs.description.isValid}
            />
            <Button type="submit" disabled={!formState.isValid} >UPDATE PLACE</Button>
        </form>
    );
}

export default UpdatePlace;