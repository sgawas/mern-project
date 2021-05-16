import React, { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth  = () => {
    const auth = useContext(AuthContext);
    const [ isLoginMode, setIsLoginMode ] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [ formState, inputHandler, setFormData ] = useForm(
        {
            email: {
                value: '',
                isValid: false
            },
            password: {
                value: '',
                isValid: false
            }
        }, 
        false
    );

    const authSubmitHandler = async event => {
        event.preventDefault();
        if(isLoginMode){

        }else {
            try{
                setIsLoading(true);
                const response = await fetch('http://localhost:5000/api/users/signup',{
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: formState.inputs.name.value,
                        email: formState.inputs.email.value,
                        password: formState.inputs.password.value
                    })
                });
                const resData = await response.json();
                if(!response.ok){
                    throw new Error(resData.message);
                }
                setIsLoading(false);
                auth.login();
            } catch (err){
                setIsLoading(false);
                setError(err.message || 'Something gone wrong, please try again.')
            }
        }    
    }

    const switchModeHandler = () => {
        if(!isLoginMode){
            setFormData(
                {
                    ...formState.inputs,
                    name: undefined
                }, 
                formState.inputs.email.isValid && formState.inputs.password.isValid
            );
        }else {
            setFormData({
                ...formState.inputs,
                name: {
                    value: '',
                    isValid: false
                }
            }, false);
        }
        setIsLoginMode(prevMode => !prevMode);
    }

    const errorHandler = () => {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler}/>
            <Card className="authentication">
                {isLoading && <LoadingSpinner asOverlay/>}
                <h2>Login Required</h2>
                <form onSubmit={authSubmitHandler}>
                    { !isLoginMode && 
                    <Input 
                        id="name" 
                        element="input" 
                        type="text" 
                        placeholder="Your Name" 
                        label="Name" 
                        errorText="Please provide your full name." 
                        onInput={inputHandler}
                        validators={[ VALIDATOR_REQUIRE() ]}
                    />
                    }
                    <Input 
                        id="email" 
                        element="input" 
                        type="email" 
                        placeholder="Email Address" 
                        label="Email Address" 
                        errorText="Please provide a valid Email Address." 
                        onInput={inputHandler}
                        validators={[ VALIDATOR_EMAIL() ]}
                    />
                    <Input 
                        id="password" 
                        element="input" 
                        type="password" 
                        placeholder="Password" 
                        label="Password" 
                        errorText="Password cannot be blank and must be atleast 5 characters long." 
                        onInput={inputHandler}
                        validators={[ VALIDATOR_MINLENGTH(5) ]}
                    />
                    <Button type="submit" disabled={!formState.isValid}>
                        {isLoginMode ? 'SIGN IN' : 'SIGN UP'}
                    </Button>
                </form>
                <Button onClick={switchModeHandler} inverse>
                    SWITCH TO {!isLoginMode ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </Card>
        </React.Fragment>
    );
}

export default Auth;