
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../AuthContext'

import axios from 'axios'

import NavBar from '../other/NavBar'

const CreateRepo = () => {

    const [owner, setowner] = useState('');

    //    let work on logic now
    const [name, setname] = useState('');
    const [description, setdescription] = useState('');
    const [visibility, setvisibility] = useState(true);




    const { curruser } = useAuth();

    // let find the user by id 
    useEffect(() => {

        const getusername = async () => {
            try {
                const userid = localStorage.getItem("userId")
                let res = await axios.get(`http://localhost:3000/api/user/profile/${userid}`);
                setowner(res.data.User);
            }
            catch (err) {
                console.log(err);
            }
        }

        getusername();

    }, [])


    const createRepository = async (e) => {
        e.preventDefault();
        const userid = localStorage.getItem("userId")
        try {

            let res = await axios.post(`http://localhost:3000/api/repo/create/${userid}`, {
                name: name,
                description: description,
                visibility: visibility
            }
            )

            window.location.href = "/home";
            console.log(res.data);

        }
        catch (err) {
            console.log(err.message)
            console.log("Error while creating an repo on clientside", err)
        }
    }





    return (
        <>
            <NavBar />
            <div className='bg-white h-[1px]'></div>

            <div className='flex flex-col h-screen w-full  bg-black text-white'>


                <div className=' flex gap-3 flex-col '>
                    <h1 className='text-lg font-semibold mt-3 ml-[500px]'>Create a new repository</h1>

                    <div className='ml-[500px] flex gap-2 mt-3' >
                        <div className=' flex items-center justify-center bg-gray-700  h-[20px] w-[20px] border-1
                 rounded-full border-white'>1</div>
                        <h2 >General</h2>
                    </div>



                    <div className='ml-[500px] flex gap-3'>
                        <div className='flex'>
                            <h2>Owner*</h2>
                            <h1 className='bg-gray-800 rounded-sm text-center w-[120px] '>{owner.username}</h1>
                        </div>
                        <label htmlFor='repository'>repository name*</label>
                        <input value={name} onChange={(e) => {
                            setname(e.target.value)
                        }} className='outline-none rounded-sm  border-2 border-white  ' type='text' name="name" id="repository"></input>
                    </div>

                    <div className='ml-[500px]'>
                        <div>
                            <h1>Description</h1>
                            <textarea
                                value={description}
                                onChange={(e) => {
                                    setdescription(e.target.value);
                                }}
                                name='description'
                                className='border-2 border-white outline-none rounded-sm px-4 py-2 w-full max-w-lg text-white bg-transparent resize-none h-32'
                                maxLength={300}
                                placeholder='Enter description here...'
                            />
                        </div>
                        <h6 className=' text-sm font-light'>0/300 characters</h6>

                    </div>
                </div>


                <div className=' flex gap-3 flex-col '>

                    <div className='ml-[500px] flex gap-2 mt-3' >
                        <div className=' flex items-center justify-center bg-gray-700  h-[20px] w-[20px] border-1
                 rounded-full border-white'>2</div>
                        <h2 >Configuration</h2>
                    </div>


                    <div className='ml-[498px] border-1 p-2 border-white h-[80px] w-[500px] rounded-sm'>
                        <div className='flex justify-between'>
                            <div>
                                  <h4 className='font-bold' >Choose Visibility*</h4>
                            <p className='font-light'>Choose who can see and commit to this repository</p>
                            </div>
                          

                            <select  
                               value={visibility.toString()}
                               onChange={(e)=>{
                                 setvisibility(e.target.value==='true');
                               }}
                            className='border-1 border-white rounded-sm '>
                                <option value="true" className="bg-gray-800">Public </option>
                                <option value="false" className="bg-gray-800">Private </option>
                            </select>
                        </div>

                    </div>



                </div>

                < div className='flex items-center justify-center mt-8' >
                    <button onClick={(e) => {
                        createRepository(e);
                    }} className='bg-green-700 rounded-sm w-[150px] border-black '>Create repository</button>
                </div >


            </div>



        </>
    )
}

export default CreateRepo




