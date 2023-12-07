import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Post from './components/Post';
import View from './components/View';
import Home from './components/Home';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {

  const abutton = () => {
    return (
      <>
      {profile ? (
        <button onClick={logOut}>Log out</button>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
      </>
    );
  }

  return (
    <>
    <div>
    <Navbar profile={profile} button={abutton}/>
      <Routes>
        <Route path='/make-a-report' element={<Post profile={profile}/>}></Route>
        <Route path='see-reports' element={<View profile={profile}/>}></Route>
        <Route path='/' element={<Home profile={profile}/>}></Route>
      </Routes>
    </div>
    {/*profile ? (
      <div>
        <img src={profile.picture} alt="user" />
        <h3>User Logged in</h3>
        <p>Name: {profile.name}</p>
        <p>Email Address: {profile.email}</p>
        <br />
        <br />
        <button onClick={logOut}>Log out</button>
      </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )*/}
    </>
  );
}

export default App;
