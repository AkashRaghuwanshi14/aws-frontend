import React from 'react'
import {Link} from 'react-router-dom'
const NavBar = () => {
  

  return (
    <div className='flex bg-black p-2 text-white justify-between '>
        
      <div className='flex gap-3'>
        <Link to="/home">
        <img className='h-13 w-24  invert object-contain '  src='https://www.pngall.com/wp-content/uploads/13/Github-Logo-Transparent.png' alt='githublogo'></img>
        </Link>
        <Link to="/home"><h1 className='mt-2'>Dashboard</h1></Link>
        
      </div>
       <div className='flex gap-3 mt-2 p-2'>
        <Link to="/create"><button className='bg-green-700 rounded-sm px-2'>New+</button></Link>
        <Link to="/profile">Profile</Link>
       </div>
    </div>
  )
}

export default NavBar

