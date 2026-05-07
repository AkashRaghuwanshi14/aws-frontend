import React from 'react'

import { useNavigate,useRoutes } from 'react-router-dom'
import { useEffect } from 'react'

// components list
import SignUp from './components/auth/SignUp'
import Login from './components/auth/Login'
import DashBoard from './components/dashboard/DashBoard'
import Profile from './components/profile/Profile'

import RepoPage from './components/other/RepoPage'
import CreateRepo from './components/repo/CreateRepo'

// authcontext
//we made this hook called custom hook
import { useAuth } from './AuthContext'
import Update from './components/other/Update'


const ProjectRoute=()=>{
      
    const {curruser,setcurruser}=useAuth();

    const navigate=useNavigate();

    useEffect(()=>{
          
        // fetch the login user id if there
        const UseridfromStorage=localStorage.getItem("userId");

        if(UseridfromStorage && !curruser){
              setcurruser(UseridfromStorage);
        }
    //    no id and we are not at login or,
    //  signup page than navigate to login page
        if(!UseridfromStorage && !["/login","/signup"].includes(window.location.pathname)){
             navigate("/login")
        }

        // if we are already login and
        //  open the login page than make user to navigate tohome
        if(UseridfromStorage && window.location.pathname=="/login"){
            navigate("/home")
        }

       if(!UseridfromStorage && window.location.pathname=='/repopage/:id'){
          navigate("/login")
       }

    },[curruser,navigate,setcurruser])

    
    //jo tags (<Routes>, <Route>) use karte the,
    //  lekin useRoutes hook ne routing ko ek simple
    //  JavaScript array bana diya hai jisko padhna 
    //     aur manage karna bohot aasan hota hai.
    let element=useRoutes([
        {
          path:"/signup",
          element:<SignUp/>  
        },
         {
          path:"/home",
          element:<DashBoard/>  
        },
         {
          path:"/login",
          element:<Login/>  
        },
         {
          path:"/profile",
          element:<Profile/>  
        },
        {
            // lets make it a dynamic route ok
            path:"/repopage/:id",
            element:<RepoPage/>
        },
        {
            path:"/create",
            element:<CreateRepo/>
        },
        {
          path:"/update",
          element:<Update/>
        }
       
    ])
    return element;

}

export default ProjectRoute;