import L from 'leaflet';

// Variable pour stocker le popup actuellement ouvert
let currentPopup = null;

export function displayMessage(map, position, message, duration = 10 * 1000) {
  // Fermer l'ancien popup s'il existe
  if (currentPopup) {
    map.removeLayer(currentPopup);
  }

  const popupContent = `
    <div id="popup-content">
      <p>${message}</p>
    </div>
  `;

  const popup = L.popup({
    closeOnClick: false,
    autoClose: false,
    closeButton: false,
    className: 'custom-popup' // Ajouter la classe personnalisée ici
  })
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  // Mettre à jour la référence au popup actuel
  currentPopup = popup;

  setTimeout(() => {
    if (currentPopup === popup) { // Vérifier si c'est le même popup qui est encore ouvert
      map.removeLayer(popup);
      createPopup(map, position); // Réaffiche le formulaire après l'expiration du message
    }
  }, duration);
}

export function createPopup(map, position) {
  // Fermer l'ancien popup s'il existe
  if (currentPopup) {
    map.removeLayer(currentPopup);
  }

  const popupContent = `
    <div id="popup-content">
      <form id="message-form">
        <textarea id="message-input" rows="3" cols="20" placeholder="Enter your message"></textarea>
        <button type="submit" id="save-button">Save</button>
      </form>
    </div>
  `;

  const popup = L.popup({
    closeOnClick: false,
    autoClose: false,
    className: 'custom-popup' // Ajouter la classe personnalisée ici
  })
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  // Mettre à jour la référence au popup actuel
  currentPopup = popup;

  document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('message-input').value;
    if (message) {
      // Remplace le contenu du popup avec le message saisi
      popup.setContent(`<p>${message}</p>`).update();

      // Envoyer le message au backend
      sendMessageToBackend(message);

      // Affiche le message et le cache après 10 secondes
      displayMessage(map, position, message);
    }
  });
}

// Fonction pour envoyer le message au backend
function sendMessageToBackend(message) {
  fetch('http://localhost:3001/messages', { // URL du serveur backend
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }), // Envoyer le message en tant que JSON
  })
    .then(response => response.json())
    .then(data => {
      console.log('Message envoyé avec succès :', data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi du message :', error);
    });
}
