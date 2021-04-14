import React from 'react';

import UsersList from '../components/UsersList';

const Users = () => {
    const USERS = [
        {
            id: '1',
            name: 'suraj gawas',
            places: 2,
            image: 'https://image-upload-suraj.s3-us-west-2.amazonaws.com/suraj.png'
        }
    ];
    return <UsersList items={USERS} />;
}

export default Users;