import React from 'react';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'; 

import './PlaceForm.css';

const NewPlace = () => {
    const [ formState, inputHandler ] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            },
            address: {
                value: '',
                isValid: false
            }
        },
        false
    );

    const formSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
    }

    return (
        <form className="place-form" onSubmit={formSubmitHandler}>
            <Input
                id="title"
                element="input" 
                type="text" 
                label="Title" 
                errorText="Title required. Please enter valid title."
                validators={[ VALIDATOR_REQUIRE() ]}
                onInput={inputHandler}
            />
            <Input
                id="description"
                element="textarea" 
                label="Description" 
                errorText="Please enter description with minimum 5 characters."
                validators={[ VALIDATOR_MINLENGTH(5) ]}
                onInput={inputHandler}
            />
            <Input
                id="address"
                element="input" 
                type="text" 
                label="Address" 
                errorText="Address required. Please enter valid address"
                validators={[ VALIDATOR_REQUIRE() ]}
                onInput={inputHandler}
            />
            <Button type="submit" disabled={!formState.isValid} >ADD PLACE</Button>
        </form>
    );
}

export default NewPlace;