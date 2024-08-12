import React, { useState, useEffect } from 'react';
import './SignupForm.css'; // Importez un fichier CSS pour le style du formulaire

function SignupForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    confirmEmail: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    email: false,
    confirmEmail: false,
    password: false,
    confirmPassword: false
  });

  useEffect(() => {
    // Vérification instantanée des emails
    const checkEmailMatch = () => {
      setErrors(prevErrors => ({
        ...prevErrors,
        email: formData.email !== formData.confirmEmail
      }));
    };

    checkEmailMatch();
  }, [formData.email, formData.confirmEmail]);

  useEffect(() => {
    // Vérification instantanée des mots de passe
    const checkPasswordMatch = () => {
      setErrors(prevErrors => ({
        ...prevErrors,
        password: formData.password !== formData.confirmPassword
      }));
    };

    checkPasswordMatch();
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation des emails
    if (formData.email !== formData.confirmEmail) {
      setErrors(prevErrors => ({ ...prevErrors, email: true }));
      return;
    }

    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setErrors(prevErrors => ({ ...prevErrors, password: true }));
      return;
    }

    // Soumettre le formulaire si tout est correct
    console.log('Formulaire soumis avec succès');
    setErrors({
      email: false,
      confirmEmail: false,
      password: false,
      confirmPassword: false
    });
  };

  return (
    <div className="signup-form-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <div className="name-fields">
          <div className="form-group">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'invalid' : ''}
          required
        />

        <label htmlFor="confirmEmail">Confirm E-mail</label>
        <input
          type="email"
          id="confirmEmail"
          name="confirmEmail"
          value={formData.confirmEmail}
          onChange={handleChange}
          className={errors.email ? 'invalid' : ''}
          required
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={errors.password ? 'invalid' : ''}
          required
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className={errors.password ? 'invalid' : ''}
          required
        />

        <div className="error" style={{ color: 'red' }}>
        {errors.email && (
            <>
            Emails do not match.<br />
            </>
        )}
          {errors.password && (
            <>
            Passwords do not match.<br />
            </>
            )}
        </div>

        <button type='submit'>Sign up</button>
      </form>
    </div>
  );
}

export default SignupForm;
