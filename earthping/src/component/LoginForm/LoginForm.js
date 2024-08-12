// src/components/LoginForm/LoginForm.js
import React, { useState } from 'react';
import './LoginForm.css'; // Assurez-vous que ce fichier CSS existe

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation simple ou soumission du formulaire
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    // Soumettre le formulaire si tout est correct
    console.log('Login submitted:', formData);
    setError('');
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
