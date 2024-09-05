import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import './Map.css'; // Importer les styles spécifiques à la carte
import { createPopup } from './MessageHandler';
import Loading from '../Loading/Loading';

function MapComponent() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUsername, setCurrentUsername] = useState('Anon'); // État pour stocker le nom d'utilisateur

  useEffect(() => {
    const fetchPosition = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition([latitude, longitude]);
            setLoading(false);
          },
          (error) => {
            console.error('Erreur de géolocalisation :', error);
            setError('Impossible de récupérer la position.');
            setLoading(false);
          }
        );
      } else {
        setError('La géolocalisation n\'est pas supportée par ce navigateur.');
        setLoading(false);
      }
    };

    fetchPosition();
  }, []);

  useEffect(() => {
    // Fonction pour récupérer le nom d'utilisateur
    const fetchUsername = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          const response = await fetch('http://localhost:3001/api/user', {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const user = await response.json();
          if (user.username) {
            setCurrentUsername(user.username);
          } else {
            setCurrentUsername('Anon');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
          setCurrentUsername('Anon');
        }
      }
    };

    fetchUsername();
  }, []); // Le tableau de dépendances est vide, donc cette fonction est appelée une seule fois au montage du composant

  useEffect(() => {
    if (position) {
      const map = L.map('map').setView(position, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const marker = L.marker(position).addTo(map);

      // Passer currentUsername à createPopup
      createPopup(map, position, currentUsername);

      return () => map.remove();
    }
  }, [position, currentUsername]); // Ajoutez currentUsername comme dépendance pour que le popup soit mis à jour avec le bon nom d'utilisateur

  if (loading) return <div><Loading /></div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
}

export default MapComponent;
