#!/bin/bash

# Démarrer PostgreSQL
sudo service postgresql start

# Attendre que PostgreSQL soit prêt
echo "Attente de PostgreSQL..."
until pg_isready -h localhost -p 5432 -U myuser; do
  sleep 1
done
echo "PostgreSQL est prêt."

# Démarrer le backend Node.js
cd my-backend
npm start &

# Démarrer le frontend React (si vous le démarrez séparément)
cd ../
npm start &

# Garder le script actif pour ne pas que les processus s'arrêtent
wait
