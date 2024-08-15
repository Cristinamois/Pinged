// src/component/Map/Map.js

import React, { useState, useEffect } from 'react';
import L from 'leaflet';
import './Map.css';
import { createPopup } from './MessageHandler';

function MapComponent() {
  const [position, setPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    if (position) {
      const map = L.map('map').setView(position, 13);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      const marker = L.marker(position).addTo(map);

      // Initial creation of the popup with the form
      createPopup(map, position);

      return () => map.remove();
    }
  }, [position]);

  if (loading) return <div>Chargement de la carte...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div id="map" style={{ height: '100vh', width: '100%' }}></div>
  );
}

export default MapComponent;
