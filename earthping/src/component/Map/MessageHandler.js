// src/component/Map/messageHandler.js

import L from 'leaflet';

// Fonction pour afficher un message pendant une certaine durée
export function displayMessage(map, position, message, duration = 10 * 1000) { // 10 secondes par défaut
  const popupContent = `
    <div id="popup-content">
      <p>${message}</p>
    </div>
  `;

  const popup = L.popup()
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  setTimeout(() => {
    map.removeLayer(popup);
    // Recréez le popup pour permettre la nouvelle saisie
    createPopup(map, position);
  }, duration);
}

// Fonction pour créer un popup avec le formulaire de message
export function createPopup(map, position) {
  const popupContent = `
    <div id="popup-content">
      <form id="message-form">
        <textarea id="message-input" rows="3" cols="20" placeholder="Enter a message"></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  `;

  const popup = L.popup()
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('message-input').value;
    if (message) {
      displayMessage(map, position, message);
    }
  });
}
