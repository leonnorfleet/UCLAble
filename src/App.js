import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar.js';
import Post from './components/Post.js';
import View from './components/View.js';
import Home from './components/Home.js'
import AccountForm from './components/AccountForm.js'
import SignUp from './components/SignUp.js'
import axios from 'axios'; //HTTP client for making API requests
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  const handleFormSubmit = (mode, formData) => {
    handleAccountFormSubmit(mode, formData, navigate);
  };
  // Function to handle signup or login
  const handleAccountFormSubmit = (mode, formData) => {
    const url = mode === 'signup' ? 'http://localhost:8080/signup' : 'http://localhost:8080/login';
    console.log('Submitting form:', mode, formData);
    console.log('Form Data:', formData);
    axios.post(url, formData)
      .then(response => {
        // success 
        console.log('Response:', response.data);
        if (response.data.success) {
          // Store user's name in localStorage or sessionStorage
          sessionStorage.setItem('userName', response.data.userName);
          // Redirect to 'Make a Report' page
          navigate('/make-a-report');
        }
      })
      .catch(error => {
        // errors 
        console.error('Error:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <>
    <Navbar/>
    <div>
      <Routes>
        <Route path='/login' element={<AccountForm mode="login" onSubmit={(formData) => handleFormSubmit('login', formData)} />} />
        <Route path='/signup' element={<AccountForm mode="signup" onSubmit={(formData) => handleFormSubmit('signup', formData)} />} />
        <Route path='/make-a-report' element={<Post/>} />
        <Route path='/see-reports' element={<View/>} />
        <Route path='/' element={<Home/>} />   
      </Routes>
    </div>
    </>
  );
}

export default App;
