// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Endpoint pour l'inscription
router.post('/signup', async (req, res) => {
  const { firstName, lastName, username, email, password } = req.body;

  if (!firstName || !lastName || !username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newUser = new User({ firstName, lastName, username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
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

module.exports = router;
