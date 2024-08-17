// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../db');

// Endpoint pour l'inscription
router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Vérifier si l'email existe déjà
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Sauvegarder l'utilisateur
    await pool.query(
      'INSERT INTO users (first_name, last_name, username, email, password) VALUES ($1, $2, $3, $4, $5)',
      [firstName, lastName, username, email, hashedPassword]
    );

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Error creating user', error: err });
  }
});


router.post('/logout', (req, res) => {
  try {
    // Effacer le cookie d'authentification s'il y en a un
    res.clearCookie('authToken'); // Assurez-vous que le nom correspond au cookie que vous utilisez pour la session

    // Répondre avec succès
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Error during logout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    // Trouver l'utilisateur
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Vérifier le mot de passe
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Générer un token
    const token = jwt.sign({ email: user.email }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
