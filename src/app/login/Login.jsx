"use client";

import UserContext from '@/context/userContext';
import { login } from '@/services/userService';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'react-toastify';


const Login = () => {
    const router = useRouter();
    const context = useContext(UserContext);
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    });

    const loginFormSubmitted = async (event) => {
        event.preventDefault();

        //validation
        if (loginData.email.trim() === "" ||
            loginData.password.trim() === "") {
            toast.info("Invalid Data!!", {
                position: "top-center"
            });
        }

        //valid data

        try {
            const result = await login(loginData);
            console.log(result);
            toast.success("Logged In", {
                position: 'top-center'
            });

            context.setUser(result.user);
            router.push("/profile/user");
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: 'top-center'
            });
        }
    }

    const resetForm = () => {
        setLoginData({
            email: '',
            password: ''
        })
    }

    return (
        <div className='grid grid-cols-12'>
            <div className='col-span-4 col-start-5'>
                <div className='py-5'>

                    <h1 className='text-3xl text-center'>Login Here</h1>
                    <form action="#!" className='mt-5' onSubmit={loginFormSubmitted} >

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
                                    setLoginData({
                                        ...loginData,
                                        email: event.target.value,
                                    })
                                }}
                                value={loginData.email}
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
                                    setLoginData({
                                        ...loginData,
                                        password: event.target.value,
                                    })
                                }}
                                value={loginData.password}
                            />
                        </div>

                        <div className='mt-3 text-center'>
                            <button type='submit' className='px-3 py-2 bg-green-600 rounded hover:bg-green-400'>Login</button>
                            <button type='button' onClick={resetForm} className='px-3 py-2 ms-3 bg-orange-600 rounded hover:bg-orange-400'>Reset</button>
                        </div>
                        {/* {JSON.stringify(loginData)} */}
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login