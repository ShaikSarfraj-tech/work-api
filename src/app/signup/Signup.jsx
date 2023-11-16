"use client";

import React, { useState } from 'react'
import signup from '../../assets/signup.svg'
import Image from 'next/image';
import { toast } from 'react-toastify';
import { signUp } from '@/services/userService';

const Signup = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        password: '',
        about: '',
        profileUrl: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'
    });

    const doSignup = async (event) => {
        event.preventDefault();

        //validation
        if (data.name.trim() === "" || data.name == null) {
            toast.warning("Name is required !!", {
                position: 'top-center'
            });
            return;
        }
        //do rest of the validations...

        //form submit
        try {
            const result = await signUp(data);
            // console.log(result);
            toast.success("User is registered!!", {
                position: "top-center"
            })
            setData({
                name: '',
                email: '',
                password: '',
                about: '',
                profileUrl: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'
            })
        } catch (error) {
            console.log(error);
            toast.error("Signup Error!! " + error.response.data.message, {
                position: 'top-center'
            })
        }
    }

    const resetForm = () => {
        setData({
            name: '',
            email: '',
            password: '',
            about: '',
            profileUrl: 'https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg'
        });
    }

    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-4 col-start-5'>
                <div className='py-5'>
                    <div className='flex justify-center m-5'>
                        <Image
                            src={signup}
                            alt='singup logo'
                            style={{
                                width: '40%'
                            }}
                        />
                    </div>
                    <h1 className='text-3xl text-center'>Signup Here</h1>
                    <form action="#!" className='mt-5' onSubmit={doSignup}>
                        {/* name */}
                        <div className='mt-3'>
                            <label htmlFor="user_name" className='block text-sm font-medium mb-2 ps-3'>Username</label>
                            <input
                                type="text"
                                className='w-full text-white p-2.5 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400'
                                placeholder='Enter here...'
                                id='user_name'
                                name='user_name'
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        name: event.target.value,
                                    });
                                }}
                                value={data.name}
                            />
                        </div>
                        {/* email */}
                        <div className='mt-3'>
                            <label
                                htmlFor="user_email"
                                className='block text-sm font-medium mb-2 ps-3'
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                className='w-full text-white p-2.5 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400'
                                placeholder='Enter here...'
                                id='user_email'
                                name='user_email'
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        email: event.target.value,
                                    })
                                }}
                                value={data.email}
                            />
                        </div>
                        {/* Password */}
                        <div className='mt-3'>
                            <label
                                htmlFor="user_password"
                                className='block text-sm font-medium mb-2 ps-3'
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                className='w-full text-white p-2.5 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400'
                                placeholder='Enter here...'
                                id='user_password'
                                name='user_password'
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        password: event.target.value,
                                    })
                                }}
                                value={data.password}
                            />
                        </div>
                        {/* about section */}
                        <div className='mt-3'>
                            <label
                                htmlFor="user_about"
                                className='block text-sm font-medium mb-2 ps-3'
                            >
                                About
                            </label>
                            <textarea
                                type="text"
                                className='w-full text-white p-2.5 rounded-3xl bg-gray-800 focus:ring-gray-400 border border-gray-400'
                                placeholder='Enter here...'
                                id='user_about'
                                rows={8}
                                name='user_about'
                                onChange={(event) => {
                                    setData({
                                        ...data,
                                        about: event.target.value,
                                    })
                                }}
                                value={data.about}
                            />
                        </div>
                        <div className='mt-3 text-center'>
                            <button type='submit' className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>Signup</button>
                            <button type='button' onClick={resetForm} className='px-3 py-2 ms-3 bg-orange-600 rounded hover:bg-orange-400'>Reset</button>
                        </div>
                        {/* {JSON.stringify(data)} */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup