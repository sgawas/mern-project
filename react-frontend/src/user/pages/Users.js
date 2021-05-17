import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [loadedUsers, setLoadedUsers] = useState();

    useEffect(()=> {

        const fetchUsers = async () => {
            try{
                const respData = await sendRequest('http://localhost:5000/api/users');
                setLoadedUsers(respData.users);
            }catch (err){
            }
        }
        fetchUsers();
    }, [sendRequest]);

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
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