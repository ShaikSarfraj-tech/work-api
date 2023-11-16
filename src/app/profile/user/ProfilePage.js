"use client";

import UserContext from '@/context/userContext';
import React, { useContext } from 'react'

const ProfilePage = () => {
    const context = useContext(UserContext);

    return (
        <div className='flex justify-center'>
            <h1 className='text-3xl'>Hi {context.user?.name }</h1>
        </div>
    )
}

export default ProfilePage