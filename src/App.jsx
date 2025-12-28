import React, { useState, useEffect } from 'react'
import { useSelector ,useDispatch } from 'react-redux'
import './App.css'
import authService from "./appwrite/auth"
import {login, logout} from "./store/authSlice"
import { Footer, Header } from './components'
import { Outlet } from 'react-router-dom'
import appwriteService from './appwrite/config'
import { setPosts, setError } from './store/postSlice'



function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()
  


  useEffect(() => {
    appwriteService.listPosts().then((res) => {
      dispatch(setPosts(res.rows));
      console.log("Fetched posts from Appwrite:", res.rows);
    }).catch((error) => {
      console.error("Error fetching posts from Appwrite:", error);
      dispatch(setError(error.message));
    }).finally(( ) => {
      console.log("Finished fetching posts.");
    });
  },[])

  const postsLoading = useSelector((state) => state.posts.loading);
  const posts = useSelector((state) => state.posts.posts);

  if (postsLoading) {
    console.log("Posts are still loading...");
  } else {
    console.log("Posts have been loaded.");
    console.log("Posts:", posts);
  }

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData && userData.emailVerification) {
        dispatch(login({userData}))
        dispatch(setPosts(res.rows));
      } else {
        dispatch(logout())
      }
    })
    .finally(() => setLoading(false))
  }, [])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App