const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const multer = require('multer');
const pool = require('./db'); // Importez la configuration de la base de données
const authRoutes = require('./routes/auth');
const app = express();
const PORT = process.env.PORT || 3001;
const jwt = require('jsonwebtoken');

// Configuration de multer pour l'upload des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Dossier pour stocker les fichiers uploadés
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nom du fichier unique
  }
});

const upload = multer({ storage });

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // L'origine de votre frontend
  credentials: true, // Pour permettre l'envoi de cookies, si vous en utilisez
};

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Servir les fichiers uploadés

// Routes d'authentification
app.use('/api', authRoutes);

// Route pour poster un message
app.post('/messages', async (req, res) => {
  const { token, message } = req.body;

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, 'your_jwt_secret');
    const email = decoded.email;

    // Obtenir les informations de l'utilisateur
    const result = await pool.query('SELECT username FROM users WHERE email = $1', [email]);
    const user = result.rows[0];
    const username = user ? user.username : 'Anon';

    // Sauvegarder le message
    await pool.query(
      'INSERT INTO messages (username, message) VALUES ($1, $2)',
      [username, message]
    );

    res.status(201).json({ message: 'Message saved' });
  } catch (error) {
    console.error('Error during message posting:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route pour obtenir les messages (optionnelle, si nécessaire)
app.get('/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error retrieving messages:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route pour tester si le serveur fonctionne
app.get('/ping', (req, res) => {
  res.json({ message: 'Pong' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
