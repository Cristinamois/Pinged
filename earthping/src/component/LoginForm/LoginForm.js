import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Pour la redirection après connexion

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', formData);
      localStorage.setItem('authToken', response.data.token); // Stocker le token
      navigate('/dashboard'); // Rediriger vers la page Dashboard après connexion
    } catch (error) {
      console.error('Error logging in:', error.response?.data || error.message);
      setError('Invalid email or password');
    }
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div className="error" style={{ color: 'red' }}>
          {error}
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
