// Route pour poster un message
app.post('/messages', async (req, res) => {
  const { token, message } = req.body;
  console.log('in messages.js')

  if (!token) {
      return res.status(400).json({ message: 'Token is required' });
  }

  try {
      // Vérifier le token
      const decoded = jwt.verify(token, 'your_jwt_secret');
      const email = decoded.email;

      // Obtenir les informations de l'utilisateur
      const result = await pool.query('SELECT username FROM users WHERE email = $1', [email]);
      const user = result.rows[0];
      const username = user ? user.username : 'Anon';
      console.log('message.js');

      // Sauvegarder le message
      await pool.query(
          'INSERT INTO messages (username, message) VALUES ($1, $2)',
          [username, message]
      );

      res.status(201).json({ message: 'Message saved' });
  } catch (error) {
      console.error('Error during message posting:', error);
      console.log('message.js catch error');
      res.status(500).json({ message: 'Internal server error', error: error.message }); // Ajouter des détails sur l'erreur
  }
});
