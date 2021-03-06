import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import { useHttpClient } from '../../shared/hooks/http-hook';

const UserPlaces = () => {
    const [ loadedPlaces, setLoadedPlaces] = useState();
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const userId = useParams().userId;
    
    useEffect(()=> {
        const fetchPlaces = async () => {
            try {
                const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            }catch(err){}
        };

        fetchPlaces();
    }, [sendRequest, userId]);

    const onDeleteHandler = placeId=> {
        setLoadedPlaces(prevPlaces=>
            prevPlaces.filter(place => place.id !== placeId)
        );
    }

    return (
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        { isLoading && 
            ( 
                <div className="center">
                    <LoadingSpinner asOverlay/>
                </div>
            )
        }
        { !isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDelete={onDeleteHandler}/>}
    </React.Fragment>);
}

export default UserPlaces;