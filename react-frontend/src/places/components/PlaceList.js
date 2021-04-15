import React from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import Button from '../../shared/components/FormElements/Button/Button';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

const PlaceList = props => {
    if(props.items.length === 0){
        return (
            <div className="place-list center">
                <Card >
                    <h2>No Place Found. Want to share a place?</h2>
                    <Button to="/places/new">Share Place</Button>
                </Card>
            </div>
        );
    }
    return (
        <ul className="place-list">
            {props.items.map(place=> {
                return <PlaceItem 
                    key={place.id} 
                    id={place.id}
                    image={place.image}
                    title={place.title}
                    description={place.description}
                    address={place.address}
                    creatorId={place.creator}
                    coordinates={place.location}
                />
            })}
        </ul>
    );
}

export default PlaceList;