import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook'; 
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';

import './PlaceForm.css';

const NewPlace = () => {
    const auth = useContext(AuthContext);
    const history = useHistory();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
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

    const formSubmitHandler = async event => {
        event.preventDefault();
        try{
            await sendRequest(
                'http://localhost:5000/api/places',
                'POST',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value,
                    address: formState.inputs.address.value,
                    creator: auth.userId
                }),
                {
                    'Content-Type': 'application/json'
                }
            );
            // redirect user to different page
            history.push('/');
        } catch(err){}
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <form className="place-form" onSubmit={formSubmitHandler}>
                { isLoading && <LoadingSpinner asOverlay />}
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
        </React.Fragment>
    );
}

export default NewPlace;