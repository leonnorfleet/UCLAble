import React, {useState, useEffect} from 'react';
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar';
import Post from './components/Post';
import View from './components/View';
import Home from './components/Home';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';  
import Profile from './components/Profile';
import axios from 'axios';

function App() {
  const [ user, setUser ] = useState([]);
  const [ profile, setProfile ] = useState([]); // The data given by GoogleLogin such as name, email, etc

  /*
  The user data is passed to all other components through props, so make sure to add the props variable
  to all future component creations
  Ex. export default function profile(props) {return (<><p>{props.profile ? props.profile.name : ''}</p></>)}
  Make sure to ALWAYS check if the props.profile value is null before doing anything with it
  uncomment the console.log on line 49 to see the data that profile contains when it is filled on login
  */

  useEffect(() => {
    // Check if access_token exists in localStorage
    const storedToken = localStorage.getItem('access_token');
    if (storedToken) {
      setUser({ access_token: storedToken });
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      localStorage.setItem('access_token', codeResponse.access_token);
      setUser(codeResponse);
    },
    onError: (error) => console.log('Login Failed:', error)
  })

  useEffect(
    () => {
      if (user.access_token) {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
          headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
          }
        })
        .then((res) => {
          const profileinf = res.data; // The data given by GoogleLogin such as name, email, etc
          //console.log(profileinf);

          axios.post('http://localhost:8080/account-interact', profileinf)
          .then(res => {
            //console.log(res.data);
          })
          .catch(err => {
            console.log(err);
          })

          setProfile(profileinf);
        })
        .catch((err) => console.log(err));
      }
      else {
        setProfile(null);
      }
    }, [user]
  );

  const logOut = () => {
    localStorage.removeItem('access_token');
    googleLogout();
    setProfile(null);
  };

  const abutton = () => { // Passed to navbar for convenience
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
        <Navbar profile={profile} button={abutton} />
        <Routes>
          <Route path='/make-a-report' element={<Post profile={profile} />} />
          <Route path='/see-reports' element={<View profile={profile} />} />
          <Route path='/profile/:userId' element={<Profile />} />
          <Route path='/' element={<Home profile={profile} />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
