import React from 'react'

import { useState,useEffect } from 'react'
import { createContext,useContext } from 'react'

// first create th context
const AuthContext=createContext();

// now whenever we want to use this Authcontext just call useAuth function
// useAuth have two parameteres {curruser,setcurruser};

export const useAuth=()=>{
    return useContext(AuthContext);
}

const AuthProvider = ({children}) => {
  const [curruser,setcurruser]=useState(null);
//   we store user is and token in local storage when user get login
 
useEffect(()=>{
   const id=localStorage.getItem("userId");
   if(id){
      setcurruser(id);
   }
},[])

const value={
   curruser,setcurruser
}

  return (
    <AuthContext.Provider value={value}>
       {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
