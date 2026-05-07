import React, { useEffect, useState } from 'react'
import NavBar from '../other/NavBar'

import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

import { useAuth } from '../../AuthContext'
import HeatMap from '../other/HeatMap'



const Profile = () => {

  const { setcurruser } = useAuth();

  const [userdetail, setuserdetail] = useState({
    username: "UserName"
  })


  useEffect(() => {

    const userId = localStorage.getItem("userId");


    const Fetchuserdetail = async () => {

      try {
        let res = await axios.get(`54.199.96.137:3000/api/user/profile/${userId}`);
        // console.log(res.data.User);
        setuserdetail(res.data.User);

      }
      catch (err) {
        console.log(err);
      }


    }

    Fetchuserdetail();

  }, [])


  return (
    <>
      <NavBar />
      <div className='bg-white h-[1px]'></div>

      <div className='flex gap-3 h-screen bg-gray-900 text-white '>
        <div className='w-1/3 flex flex-col  items-center' >
          <div className='h-[300px] w-[300px] mt-13 mb-3 border-2 rounded-full border-white'>
            <img className='h-[300px] w-[300px] rounded-full' src="https://tse1.mm.bing.net/th/id/OIP.WDDxXhdXlhGPfBSy5imfgwHaD4?pid=Api&P=0&h=180"></img>
          </div>
          <h1>{userdetail.username}</h1>
          <h2>{userdetail.email}</h2>
          <button
            className='mt-2 mb-5 border-[1px] px-10'><Link to="/update">Edit profile</Link></button>
          <button onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userId");

            setcurruser(null);
            window.location.href = "/login";
          }}

            className='mt-5 border-[1px] px-6'><Link>Sign out</Link></button>

        </div>



        <div className='bg-white w-[1px]'></div>

        <div>


        </div>

        <HeatMap/>

      </div>

    </>
  )
}

export default Profile
