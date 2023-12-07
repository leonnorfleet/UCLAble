import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.js';
import Post from './components/Post.js';
import View from './components/View.js';
import Home from './components/Home.js'
import AccountForm from './components/AccountForm.js'
import SignUp from './components/SignUp.js'
import axios from 'axios'; //HTTP client for making API requests

import React from 'react';
import ReactDOM from 'react-dom';
import AppComponent from './App';
import { AuthProvider } from './components/AuthenticationState'; 
import { useAuth } from './components/AuthenticationState'; 

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider> {}
      <AppComponent />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


function App() {

  /* Testing out how to sort dates by recency
  function handleClick() { 
    let day1 = new Date('August 19, 1975 23:15:30');
    let day2 = new Date('February 19, 2010 23:15:30');
    let arr = [day2, day1];
    arr.sort(function(a, b) {
      return b - a;
    });
    console.log(arr);
  }*/

  const { login } = useAuth();
  // Function to handle signup or login
  const handleAccountFormSubmit = (mode, formData, tokenId) => {
    
    axios.post('/google-login', { tokenId })
       .then(response => {
         if (response.data.success) {
           console.log('Google Sign-In successful');
           login(response.data.user);
         } else {
           console.log('Google Sign-In failed');
         }
       })
       .catch(error => {
         console.error('Error during Google Sign-In:', error);
        });
  }

  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path='/make-a-report' element={<Post/>} />
        <Route path='/see-reports' element={<View/>} />
        <Route path='/' element={<Home/>} />   
      </Routes>
    </div>
    </>
  );
}

export default App;
