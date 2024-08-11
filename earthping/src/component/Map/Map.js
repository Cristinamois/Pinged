// src/components/MapComponent.js

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Loading from '../Loading/Loading';

function MapComponent() {
  const [position, setPosition] = useState(null); // Initialement null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fonction pour obtenir la position actuelle
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

  // Afficher un message d'erreur ou un message de chargement si nécessaire
  if (loading) return <div><Loading /></div>;
  if (error) return <div>{error}</div>;

  return (
    <MapContainer center={position} zoom={13} style={{ height: '85vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {position && (
        <Marker position={position} icon={L.icon({iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png'})}>
          <Popup>
            Vous êtes ici.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}

export default MapComponent;
