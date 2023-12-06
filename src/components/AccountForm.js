import { useState } from 'react';
import { Link } from "react-router-dom"
import '../styles/account_form.css';

function AccountForm({func}) {

    const [formData, setFormData] =  useState({name: '', email: '', password: ''});

    const handleChange = (event) => {
		const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
	};

    const handleSubmit = (event) => {
        event.preventDefault();
        func(formData, 'signup');
        setFormData({name: '', email: '', password: ''});
        alert('Form Submitted!')
    }

    return(
        <div className="account-form-container">
            <h1>Welcome Back!</h1>
            <form onSubmit={handleSubmit} className="account-form">
                <label htmlFor='name'></label>
                <input type='text' id='name' name='name' value={formData.name} onChange={handleChange} placeholder='Name'/>

                <label htmlFor='email'></label>
                <input type='email' id='email' name='email' value={formData.email} onChange={handleChange} placeholder='Email'/>

                <label htmlFor='pass'></label>
                <input type='password' id='password' name='password' value={formData.password} onChange={handleChange} placeholder='Password'/>

                <button type='submit'>Submit</button>
            </form>
            <p></p>
            <Link to="/sign-up">Sign Up</Link>
        </div>
    );
}

export default AccountForm;