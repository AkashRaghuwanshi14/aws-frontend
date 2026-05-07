import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom'

import RepoPage from '../other/RepoPage';
import NavBar from '../other/NavBar';

const DashBoard = () => {

  // owner repository functionalites 
  const [repositories, setrepositories] = useState([]);


  const [searchrepo, setsearhrepo] = useState('');

  const [searchresult, setsearchresult] = useState([]);

  //let create a find a repository functionalities for all repositories
  const [suggestedrepository, setsuggestedrepository] = useState([]);

  const [findrepo, setfindrepo] = useState('');
  const [findresult, setfindresult] = useState([]);



  useEffect(() => {
    const userId = localStorage.getItem("userId");


    const fetchrepo = async () => {

      try {
        const res = await axios.get(`54.199.96.137:3000/api/repo/user/${userId}`);
        setrepositories(res.data.repository);

      } catch (err) {
        console.log("Error in fetching repository", err);
      }
    }

    const fetchallsuggestedrepo = async () => {

      try {
        const res = await axios.get(`54.199.96.137:3000/api/repo/all`);
        setsuggestedrepository(res.data.repository);

      } catch (err) {
        console.log("Error in fetching repository", err);
      }
    }

    fetchrepo();
    fetchallsuggestedrepo();
  }, []);


  // useffcet for middle portion depend on searchrepo and repositories
  useEffect(() => {
    //  if user do not search anything than we show all user repositoires
    if (searchrepo == '') {
      setsearchresult(repositories);
    }

    else {
      const filteredrepo = repositories.filter((repo) =>
        repo.name.toLowerCase().includes(searchrepo.toLowerCase())
      )
      setsearchresult(filteredrepo);
    }

  }, [searchrepo, repositories])



  useEffect(() => {

    if (findrepo == '') {
      setfindresult(suggestedrepository);
    }
    else {
      const filteredfromallrepo = suggestedrepository.filter((repo) =>
        repo.name.toLowerCase().includes(findrepo.toLowerCase())
      )

      setfindresult(filteredfromallrepo);

    }

  }, [findrepo, suggestedrepository])



  return (

    <div className='scrollbar-hide'>
    <NavBar/>
    <div className='bg-white h-[1px]'></div>
    <div className='h-screen w-full  flex   text-white' >

      <aside className='w-1/4 bg-gray-900 '>
        <h1 className='text-2xl font-bold mt-2 ml-2'>Top Repositories</h1>
        <div>
          <input className='border-2 border-white px-5 mt-3 ml-2 outline-none'
            type='text' placeholder='Find a repository...' value={findrepo} onChange={(e) => {
              setfindrepo(e.target.value)
            }}
          ></input>
        </div>

        {
          findresult.map((elem) => {
            return <div className='ml-3 mt-4' key={elem._id}>
              <Link className='hover:underline' to={`/repopage/${elem._id}`}> {elem.name}/{elem._id} </Link>

            </div>
          })
        }


      </aside>
<div className='bg-white w-[1px]'></div>
  


      {/* main page please wait */}
      <main className=' w-3/4 bg-black flex justify-between p-2'>
        <div>
          <h1 className='text-2xl font-bold ml-2'>Your Repositories</h1>
          <div>
            <input className='border-2 border-white mt-3 ml-2 outline-none'
              type='text' placeholder='search...' value={searchrepo} onChange={(e) => {
                setsearhrepo(e.target.value)

              }}
            ></input>
          </div>
          {
            searchresult.map((elem, id) => {
              return <div className='ml-2 mt-3' key={id}>
                <Link className='hover:underline' to={`/repopage/${elem._id}`}><h3>{elem.name}</h3></Link>
              </div>
            })
          }

        </div>

        <aside className='bg-gray-900 mr-6'>
          <h1 className='text-3xl font-bold mt-2 '>Learning GitHub </h1>
          <ul className='ml-2 mt-3 hover:underline'>
            <li className='mb-2 '><Link to="https://www.youtube.com/watch?v=Ez8F0nW6S-w">Git-Commands</Link></li>
            <li className='mb-2 '><Link to="https://www.youtube.com/watch?v=mAFoROnOfHs">Git&GitHub</Link></li>
            <li className='mb-2'><Link to="https://www.youtube.com/watch?v=qsTthZi23VE">Advance Git</Link></li>

          </ul>
        </aside>

      </main>


    </div>
    </div>
  )
}

export default DashBoard
