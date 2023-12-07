import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/navbar.css';
import logo from '../imgs/uclable_logo.png';
import ThemeToggle from './ThemeToggle.js';
import { GoogleLogin } from 'react-google-login';
import { useAuth } from './AuthenticationState'; 

export default function Navbar() {
    const { user, login, logout } = useAuth();
    const responseGoogle = async (response) => {
        try {
          const tokenId = response.tokenId;
          const serverResponse = await fetch('/google-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token: tokenId }),
          });
          const data = await serverResponse.json();
          
          if (data.success) {
            console.log('Google Sign-In successful');
            login(data.user);
          } else {
            console.log('Google Sign-In failed');
          }
        } catch (error) {
          console.error('Error during Google Sign-In:', error);
        }
      };
      const handleLogout = () => {
        logout(); // Log the user out
      };
      return (
        <nav className="nav">
            {/* Display login/logout buttons based on authentication state */}
            {user ? (
                <>
                    <p>Welcome, {user.name}!</p>
                    <button onClick={handleLogout}>Logout</button>
                 </>
            ) : (
                <>
                    <button onClick={responseGoogle}>Login with Google</button>
                </>
            )}
            <div className="nav-logo">
                <img src={logo} alt="UCLAble Logo"/>
            </div>
            <ul className="nav-links-left">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/make-a-report">Make a Report</Link></li>
                <li><Link to="/see-reports">View Reports</Link></li>
            </ul>
            <ul className="nav-links-right">
                {/* Add the Google Sign-In button */}
                <li>
                <GoogleLogin
                    clientId="77081081456-7du49eo167ere00c7npqidttt56qcjlu.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                </li>
                <li><ThemeToggle /></li>
            </ul>
        </nav>
    )
}