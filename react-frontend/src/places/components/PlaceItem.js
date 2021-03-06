import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button/Button';
import Modal from '../../shared/components/UIElements/Modal/Modal';
import Map from '../../shared/components/UIElements/Map/Map';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http-hook';
import './PlaceItem.css';
import ErrorModal from '../../shared/components/UIElements/ErrorModal/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner/LoadingSpinner';

const PlaceItem = props => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [ showMap, setShowMap ] = useState(false);
    const [ showDeleteModal,  setShowDeleteModal ] = useState(false);

    const openMapHandler = () => setShowMap(true);

    const closeMapHandler = () => setShowMap(false);

    const showDeleteWarningHandler = () => setShowDeleteModal(true);

    const cancelDeleteHandler = () =>  setShowDeleteModal(false);

    const confirmDeleteHandler = async () => {
        setShowDeleteModal(false);
        try {
            await sendRequest(`http://localhost:5000/api/places/${props.id}`, 'DELETE');
            props.onDelete(props.id);
        } catch(err){};
    }

    return (
        <React.Fragment>
            <ErrorModal error={error} onClear={clearError} />
            <Modal
                show={showMap}
                onCancel={closeMapHandler}
                header={props.address}
                contentClass="place-item__modal-content"
                footerClass="place-item__modal-actions"
                footer={
                    <Button onClick={closeMapHandler} >CLOSE</Button>
                }
            >
                <div className="map-container">
                    <Map center={props.coordinates} zoom={16}/>
                </div>
            </Modal>
            <Modal
                show={showDeleteModal}
                onCancel={cancelDeleteHandler}
                header="Are you sure?"
                footerClass="place-item__modal-actions"
                footer={
                    <React.Fragment>
                        <Button inverse onClick={cancelDeleteHandler}>CANCEL</Button>
                        <Button danger onClick={confirmDeleteHandler}>DELETE</Button>
                    </React.Fragment>
                }
            >
                <p>Are you sure, you want to delete this place? Once deleted, it will not be retrieved again.</p>
            </Modal>
            <li className="place-item">
                <Card className="place-item__content" >
                    {isLoading && <LoadingSpinner asOverlay />}
                    <div className="place-item__image">
                        <img src={props.image} alt={props.title} />
                    </div>
                    <div className="place-item__info">
                        <h2>{props.title}</h2>
                        <h3>{props.address}</h3>
                        <p>{props.description}</p>
                    </div>
                    <div className="place-item__actions">
                        <Button inverse onClick={openMapHandler}>VIEM ON MAP</Button>
                        { auth.userId === props.creatorId && <Button to={`/places/${props.id}`}>EDIT</Button> }
                        { auth.userId === props.creatorId && <Button danger onClick={showDeleteWarningHandler}>DELETE</Button> }
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
}

export default PlaceItem;