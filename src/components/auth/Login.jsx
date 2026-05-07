import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../AuthContext';
import axios from 'axios';

const Login = () => {


  const{curruser,setcurruser}=useAuth();

  // useEffect(()=>{
  //     // agar user login page pr h mtlb bo logout h 
  //     // humme localstorage uski detail mitani padegi
  //     localStorage.removeItem("token");
  //     localStorage.removeItem("userId");
  //     setcurruser(null);
  // })

// now login functionality

  const[email,setemail]=useState('');
   const[password,setpassword]=useState('');
   const[loading,setloading]=useState(false);

    const handlesubmit=async(e)=>{
          e.preventDefault();
        try{
              setloading(true);
              let res=await axios.post("54.199.96.137:3000/api/user/login",{
                  email:email,
                  password:password
              })
            console.log(res);
              localStorage.setItem("token",res.data.token);
              localStorage.setItem("userId",res.data.userId);
              
              setcurruser(res.data.userId);
              setloading(false);
             window.location.href="/home";

        }
        catch(err){
          console.log(err);
          alert("Login Failed");
          setloading(false);
      }
        
    }
  return (
    <div className='h-screen bg-black w-full flex flex-col items-center gap-2'>
      {/* logo */}

      <div>
        <img className='h-13 w-24 m-auto mt-12  mb-4 invert object-contain '  src='https://www.pngall.com/wp-content/uploads/13/Github-Logo-Transparent.png' alt='githublogo'></img>
      </div>
      {/* header signup */}

      <div>
        <h1 className='text-2xl font-semibold mb-4 text-white'>Sign in</h1>
      </div>
      {/* inputs */}
     
      <form   onSubmit={(e)=>{
        handlesubmit(e);
      }}
      className='bg-gray-900 w-1/3 rounded-xl '>
       <div className='flex flex-col gap-2 justify-center text-center'>
          <label className=' text-lg  text-white' htmlFor='email'>Email</label>
          <input onChange={(e)=>{setemail(e.target.value)}} 
          className='text-white m-auto px-6 py-1 border-2  rounded-sm outline-none border-white' value={email} type='email' id='email' name='email' autoComplete='off' placeholder='Enter Your Email'></input>
      </div>
       
        <div className='flex flex-col gap-2 justify-center text-center'>
          <label 
           className='  text-white text-lg' htmlFor='username'>Password</label>
          <input  onChange={(e)=>{setpassword(e.target.value)}} 
            value={password}
           className='text-white m-auto px-6 py-1  border-2  rounded-sm outline-none border-white' type='password' id='passwprd' name='username' autoComplete='off' placeholder='Enter Your Password'></input>
      </div>

       <div className='flex justify-center mt-3'>
        {/* jb tk loading chal rahi h button ko disable krdo */}
        <button disabled={loading}
         className="bg-sky-500  hover:bg-sky-700 ... px-16 py-1 rounded-sm  text-white">{loading ? "loading.." :"Login"}</button>
      </div>


      </form>

       <div className='bg-black py-8 w-1/4 mt-3 flex justify-center rounded-sm border-2 border-white'>
       <p className='text-white'>New to GiHub?<Link to="/signup" className='text-blue-700'>Create an account</Link></p>
     </div>
   
    </div>
  )
}

export default Login
