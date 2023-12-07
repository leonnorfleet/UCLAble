import { useState } from 'react';
import { Link } from "react-router-dom"
import '../styles/account_form.css';

//AccountForm now takes two props:
// mode: is the form for 'signup' or 'login'.
// onSubmit: to be called when the form is submitted.

function AccountForm({ mode, onSubmit }) {
    const [formData, setFormData] = useState({name: '', email: '', password: ''});

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        function validateEmail(email) {
            const regex = /@(g\.)?ucla\.edu$/;
            return regex.test(email);
        }
        function validatePass(password) {
            const regex = /(?=.*[A-Z])(?=.*[@$%!^&#]).{8,}/;
            return regex.test(password);
        }

        if (!validateEmail(formData.email)) {
            alert('Invalid email address. UCLA members only with @ucla.edu or @g.ucla.edu domain');
            return; // Exit the submit function early if validation fails
        }
        if (!validatePass(formData.password)) {
            alert('Password must have at least eight characters, at least one uppercase letter, and at least one special character.');
            return; // Exit the submit function early if validation fails
        }
        if(validateEmail && validatePass) {
            alert('Sign-up successful! Press OK to redirect to the login page.');
            window.location.href = "/login";
        }
        
        // Prepare data to submit after validation
         const dataToSubmit = {
            ...formData,
            email: formData.email.trim().toLowerCase(), // Trim whitespace and convert to lowercase
            name: formData.name.trim(), // Trim whitespace from the name
            createdAt: new Date().toISOString() // Add a timestamp (if needed)
        };

        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSubmit),
            });
    
            const responseData = await response.json();
        } 
        
        catch (error) {
            console.error('Error during signup:', error);
        }

        onSubmit(dataToSubmit, mode); // Pass mode 
        setFormData({name: '', email: '', password: ''});
    }

    const isSignup = mode === 'signup';

    return(
        <div className="account-form-container">
            <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
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
