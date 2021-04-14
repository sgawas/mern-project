import React, { useCallback, useReducer } from 'react';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators'; 

import './NewPlace.css';

const formReducer = (state, action) => {
    switch(action.type){
        case 'INPUT_CHANGE':
            let formIsValid = true;
            for(let inputId in state.inputs){
                if(inputId === action.inputId){
                    formIsValid = formIsValid && action.isValid;
                } else {
                    formIsValid = formIsValid && state.inputs[inputId].isValid;
                }
            }
            return {
                ...state,
                inputs: {
                    ...state.inputs,
                    [action.inputId]: { value: action.value, isValid: action.isValid }
                },
                isValid: formIsValid
            };
        default: return state;
    }
};

const NewPlace = () => {
    const [ formState, dispatch ] = useReducer(formReducer, {
        inputs: {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        },
        isValid: false
    });

    const inputHandler = useCallback((id, value, isValid) => {
        dispatch({
            type: 'INPUT_CHANGE',
            value,
            inputId: id,
            isValid
        });
    },[]);

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
                type="text" 
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