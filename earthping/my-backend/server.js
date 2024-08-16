const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json()); // Pour analyser le corps JSON des requêtes
app.use(cors()); // Pour permettre les requêtes CORS si nécessaire

// Simuler un stockage en mémoire
let messages = [];

// Route POST pour recevoir des messages
app.post('/messages', (req, res) => {
  const { message } = req.body;
  console.log('Message Recu: ', message);
  if (message) {
    messages.push(message);
    res.json({ success: true, message: 'Message reçu' });
  } else {
    res.status(400).json({ success: false, message: 'Message manquant' });
  }
});

// Route GET pour récupérer les messages
app.get('/messages', (req, res) => {
  res.json(messages);
});

// Démarrer le serveur
app.listen(3001, () => {
  console.log('Serveur en cours d\'exécution sur http://localhost:3001');
});
