import axios from 'axios';
import React, { useEffect, useState } from 'react'

import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import NavBar from './NavBar';

const RepoPage = () => {
    //    using useparams hook let fetch the id of repository from link
    const { id } = useParams();

    const navigate=useNavigate();

    //by using this id we can fetch the repository details like name,description,content ,owner
    const [repoDetails, setrepodetail] = useState('');

    const handledelete= async ()=>{

         try{
           
            await axios.delete(`54.199.96.137:3000/api/repo/delete/${id}`)
            navigate("/home");

         }
         catch(err){
              console.log(err);
         }
    }





    useEffect(() => {


        const specficrepo = async () => {

            try {

                let res = await axios.get(`54.199.96.137:3000/api/repo/id/${id}`);
              //  console.log(res.data.repositoy);
                setrepodetail(res.data.repositoy);
            }
            catch (err) {
                console.log("Error in repopage:", err);
            }
        }


        specficrepo();

    }, [id]);


    if (!repoDetails) {
        return <div className="text-white text-center mt-10">Loading Repository Details...</div>;
    }

    return (

        <>
        <NavBar/>
        <div className='bg-black h-screen text-white p-10'>
            <div className='flex gap-3 items-center text-center'>
                <h1 className='text-4xl font-bold'>{repoDetails.name}</h1>
                {
                    repoDetails.visibility ?
                        <button className='bg-gray-900 border-2 border-white rounded-2xl px-3 '>Public</button> :
                        <button className='bg-black rounded-2xl px-3  text-white border-2 border-gray-600'>Private</button>
                }
            </div>

            <h2>Created By: {repoDetails.owner.username}</h2>
            <h2> {repoDetails.owner.email}</h2> 
            <p className='mt-4 text-gray-400'>README: {repoDetails.description}</p>
            {/* Aap baaki details jaise description, visibility, issues yahan dikha sakte hain */}
            <button  
               onClick={handledelete}
            
            className='border-2 border-white rounded-sm mt-4 px-5'>Delete</button>
        </div>
        </>
    )
}

export default RepoPage;
