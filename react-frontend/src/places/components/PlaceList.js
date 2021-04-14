import React from 'react';

import Card from '../../shared/components/UIElements/Card/Card';
import PlaceItem from './PlaceItem';

import './PlaceList.css';

const PlaceList = props => {
    if(props.items.length === 0){
        return (
            <div className="place-list center">
                <Card >No Place Found. Want to create a place?</Card>
                <button type="submit">Create Place</button>
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