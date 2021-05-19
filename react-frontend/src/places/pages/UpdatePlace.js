import React, { useEffect, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input/Input';
import Button from '../../shared/components/FormElements/Button/Button';
import Card from '../../shared/components/UIElements/Card/Card';
import { VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import {AuthContext} from '../../shared/context/auth-context';
import './PlaceForm.css';

const UpdatePlace = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ loadedPlace, setLoadedPlace ] = useState();
    const placeId = useParams().placeId;


    const [ formState, inputHandler, setFormData ] = useForm(
        {
            title: {
                value: '',
                isValid: false
            },
            description: {
                value: '',
                isValid: false
            }
        }, 
        false);

    useEffect(()=>{
        const fetchPlace = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/${placeId}`);
                setLoadedPlace(responseData.place);
                setFormData(
                    {
                        title: {
                            value: responseData.place.title,
                            isValid: true
                        },
                        description: {
                            value: responseData.place.description,
                            isValid: true
                        }
                    }, 
                    true
                );
            } catch(err){}
        };
        fetchPlace();
    }, [sendRequest, setFormData, placeId]) 
    
    const updateFormSubmitHandler = async event => {
        event.preventDefault();
        try{
            await sendRequest(
                `http://localhost:5000/api/places/${placeId}`,
                'PATCH',
                JSON.stringify({
                    title: formState.inputs.title.value,
                    description: formState.inputs.description.value
                }),
                { 
                    'Content-Type': 'application/json'
                }
            );
            history.push('/' + auth.userId + '/places');
        } catch(err){}
    }

    if(isLoading){
        return (
            <div className="center">
                <LoadingSpinner asOverlay />
            </div>
        );
    }

    if(!loadedPlace){
        return (
            <div className="center">
                <Card>
                    <h2>Could not find place!</h2>
                </Card>
            </div>
        );
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            {!isLoading && loadedPlace &&
                <form className="place-form" onSubmit={updateFormSubmitHandler}>
                    <Input
                        id="title"
                        element="input" 
                        type="text" 
                        label="Title" 
                        errorText="Title required. Please enter valid title."
                        validators={[ VALIDATOR_REQUIRE() ]}
                        onInput={inputHandler}
                        initialValue={loadedPlace.title}
                        initialValid={true}
                    />
                    <Input
                        id="description"
                        element="textarea" 
                        label="Description" 
                        errorText="Please enter description with minimum 5 characters."
                        validators={[ VALIDATOR_MINLENGTH(5) ]}
                        onInput={inputHandler}
                        initialValue={loadedPlace.description}
                        initialValid={true}
                    />
                    <Button type="submit" disabled={!formState.isValid} >UPDATE PLACE</Button>
                </form>
            }
        </React.Fragment>
    );
}

export default UpdatePlace;