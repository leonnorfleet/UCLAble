import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/account_form.css';


function AccountForm({ mode, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState(''); // Add an error state to store error messages

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await onSubmit(formData, mode);
      // Reset
      setFormData({ name: '', email: '', password: '' });
      setError('');
    } catch (error) {
      // Handle errors 
      setError(error.response ? error.response.data.error : error.message);
    }
  };

  const isSignup = mode === 'signup';

  return (
    <div className="account-form-container">
      <h1>{isSignup ? 'Sign Up' : 'Login'}</h1>
      {error && <div className="error-message">{error}</div>} {/*error*/}
      <form onSubmit={handleSubmit} className="account-form">
        {isSignup && (
          <div>
            <label htmlFor="name"></label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
          </div>
        )}

        <div>
          <label htmlFor="email"></label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        </div>

        <div>
          <label htmlFor="password"></label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
        </div>

        <button type="submit">{isSignup ? 'Sign Up' : 'Login'}</button>
      </form>
    </div>
  );
}

export default AccountForm;

