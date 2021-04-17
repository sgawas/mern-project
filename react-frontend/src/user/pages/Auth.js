import React, { useState, useContext } from 'react';

import Button from '../../shared/components/FormElements/Button/Button';
import Input from '../../shared/components/FormElements/Input/Input';
import Card from '../../shared/components/UIElements/Card/Card';
import { useForm } from '../../shared/hooks/form-hook';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

const Auth  = () => {
    const auth = useContext(AuthContext);
    const [ isLoginMode, setIsLoginMode ] = useState(true);
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

    const authSubmitHandler = event => {
        event.preventDefault();
        console.log(formState);
        auth.login();
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

    return (
        <Card className="authentication">
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
    );
}

export default Auth;