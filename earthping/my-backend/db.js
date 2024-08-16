const { Pool } = require('pg');

// Créez un pool de connexions avec les paramètres corrects
const pool = new Pool({
  user: 'postgres', // Nom d'utilisateur PostgreSQL
  host: 'localhost', // Hôte de la base de données
  database: 'mydatabase', // Nom de votre base de données
  password: 'postgres', // Mot de passe PostgreSQL
  port: 5432, // Port PostgreSQL
});

module.exports = pool;
