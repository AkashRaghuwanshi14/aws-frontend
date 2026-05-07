import React, { useEffect, useState } from 'react'

import NavBar from './NavBar'

import { Link } from 'react-router-dom'
import axios from 'axios';

const Update = () => {

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');


    const handleupdate =async (e) => {
        e.preventDefault();

        const userid = localStorage.getItem("userId");

        try {

            await axios.patch(`https://my-aws-backend.onrender.com/api/user/update/${userid}`, {
                email: email,
                password: password
            })

            window.location.href="/profile";
        }
        catch (err) {
            console.log(err);
        }
    }

    return (

        <>
            <NavBar />
            <div className='bg-white h-[1px]'>

            </div>
            <div className='h-screen flex flex-col justify-center items-center bg-black w-full  gap-2'>
                {/* logo */}

                <form onSubmit={(e) => {
                    handleupdate(e);
                }} className='border-2 border-white rounded-sm w-[400px] h-[350px] flex flex-col justify-center items-center'>
                    <div className='flex flex-col gap-2 justify-center text-center'>
                        <label className=' text-lg  text-white' htmlFor='email'>Email</label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setemail(e.target.value);
                            }}
                            className='text-white m-auto px-6 py-1 border-2  rounded-sm outline-none border-white' type='email' id='email' name='email' autoComplete='off' placeholder='Update Your Email'></input>
                    </div>

                    <div className='flex flex-col gap-2 justify-center text-center'>
                        <label
                            className='  text-white text-lg' htmlFor='password'>Password</label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setpassword(e.target.value)
                            }}
                            className='text-white m-auto px-6 py-1  border-2  rounded-sm outline-none border-white' type='password' id='passwprd' name='username' autoComplete='off' placeholder='Update Your Password'></input>
                    </div>

                    <div className='mt-6'>
                        <button className='bg-green-800 border-1 px-4 rounded-sm border-white'>Save</button>
                    </div>

                </form>

            </div>
        </>

    )
}

export default Update
