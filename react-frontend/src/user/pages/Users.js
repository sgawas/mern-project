import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';

const Users = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(()=> {

        const sendRequest = async () => {
            setIsLoading(true);
            try{
                const response = await fetch('http://localhost:5000/api/users');
                const respData = await response.json();
                if(!response.ok){
                    throw new Error(respData.message);
                }
                setLoadedUsers(respData.users);

            }catch (err){
                setError(err.message || 'Something went wrong, please try again.')
            }
            setIsLoading(false);
        }

        sendRequest();
    }, []);

    const errorHandler = ()=> {
        setError(null);
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={errorHandler} />
            { isLoading && (
                <div className="center">
                    <LoadingSpinner asOverlay />
                </div>)
            }
            {!isLoading && loadedUsers &&
                <UsersList items={loadedUsers} />
            }
        </React.Fragment>
    );
}

export default Users;