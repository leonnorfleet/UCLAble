import { Link } from "react-router-dom"
import { GoogleLogin } from 'react-google-login';
import '../styles/account_form.css';
import React, { useState } from 'react';
import { useAuth } from './AuthenticationState.js';


function AccountForm({ mode, onSubmit }) {
    const { login } = useAuth();
    const [formData, setFormData] = useState({name: '', email: '', password: ''});

    const responseGoogle = async (response) => {
        try {
          const tokenId = response.tokenId;
          const serverResponse = await fetch('/google-login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ tokenId }),
          });
          const data = await serverResponse.json();
        } catch (error) {
          console.error('Error during Google Sign-In:', error);
        }
      };
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
    }

    const isSignup = mode === 'signup';

    return(
        <div className="account-form-container">
            <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
            <GoogleLogin
              clientId="77081081456-7du49eo167ere00c7npqidttt56qcjlu.apps.googleusercontent.com"
              buttonText="Login with Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={'single_host_origin'}
              />
            <form onSubmit={handleSubmit} className="account-form">
                {isSignup && (
                    <div>
                        <label htmlFor='name'></label>
                        <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Name'/>
                    </div>
                )}
                
                <div>
                    <label htmlFor='email'></label>
                    <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email'/>
                </div>

                <div>
                    <label htmlFor='password'></label>
                    <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password'/>
                </div>

                <button type='submit'>{isSignup ? 'Sign Up' : 'Login'}</button>
            </form>
        </div>
    );
}

export default AccountForm;
