import { useState } from 'react';
import '../styles/sign_up.css';

function SignUp({ func }) {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    func(formData, 'signup');
    setFormData({ name: '', email: '', password: '' });
    alert('Form Submitted!');
  };

  return (
    <div className="sign-up-container">
      <h1>Create an Account</h1>
      <form onSubmit={handleSubmit} className="sign-up">
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name}
          onChange={handleChange}
          placeholder='Name'
          required
        />

        <input
          type='email'
          id='email'
          name='email'
          value={formData.email}
          onChange={handleChange}
          placeholder='Email'
          required
        />

        <input
          type='password'
          id='password'
          name='password'
          value={formData.password}
          onChange={handleChange}
          placeholder='Password'
          required
        />

        <button type='submit'>Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;


