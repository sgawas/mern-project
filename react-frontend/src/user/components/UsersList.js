import React from 'react';

import UserItem from './UserItem';
import Card from '../../shared/components/UIElements/Card/Card';

import './UsersList.css';

const UsersList = props => {
    if(props.items.length === 0){
        return (
            <div className="center">
                <Card>
                    <h1>No user found.</h1>
                </Card>
            </div>
        );
    }

    return (
        <ul className="users-list">
            {
                props.items.map(user=>{
                    return (
                        <UserItem 
                            key={user.id} 
                            id={user.id} 
                            name={user.name} 
                            image={user.image} 
                            placeCount={user.places.length} 
                        />
                    );
                })
            }
        </ul>
    )
}
export default UsersList;