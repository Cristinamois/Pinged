const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('./db'); // Assurez-vous que ce fichier existe et est correctement configuré
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3001;

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routes
app.use('/api', authRoutes); // Route pour les authentifications

// Route pour tester si le serveur fonctionne
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
