import L from 'leaflet';

// Variable pour stocker le popup actuellement ouvert
let currentPopup = null;

// Fonction pour envoyer le message au backend
export function sendMessageToBackend(message, username) {
  const token = localStorage.getItem('authToken'); // Assurez-vous que le token est stocké dans le localStorage
  if (!token) {
    console.error('Token is not available');
    return;
  }

  fetch('http://localhost:3001/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}` // Inclure le token dans les headers
    },
    body: JSON.stringify({ message, username }), // Envoyer le message et le nom d'utilisateur
  })
    .then(response => response.json())
    .then(data => {
      console.log('Message envoyé avec succès :', data);
    })
    .catch(error => {
      console.error('Erreur lors de l\'envoi du message :', error);
    });
}

let currentUsername = 'Anon';


export function fetchUsername() {
  const token = localStorage.getItem('authToken');
  if (token) {
    fetch('http://localhost:3001/api/user', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(user => {
        currentUsername = user.username;
      })
      .catch(error => {
        console.error('Erreur lors de la récupération du nom d\'utilisateur :', error);
      });
  }
}





export function displayMessage(map, position, message, username, duration = 10 * 1000) {
  if (currentPopup) {
    map.removeLayer(currentPopup);
  }

  const popupContent = `
    <div id="popup-content">
      <p><strong>${username}:</strong> ${message}</p>
    </div>
  `;

  const popup = L.popup({
    closeOnClick: false,
    autoClose: false,
    closeButton: false,
    className: 'custom-popup'
  })
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  currentPopup = popup;

  setTimeout(() => {
    if (currentPopup === popup) {
      map.removeLayer(popup);
      createPopup(map, position, username);
    }
  }, duration);
}

export function createPopup(map, position, username) {
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
    className: 'custom-popup'
  })
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  currentPopup = popup;

  document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('message-input').value;
    if (message) {
      popup.setContent(`<p><strong>${username}:</strong> ${message}</p>`).update();
      sendMessageToBackend(message, username);
      displayMessage(map, position, message, username);
    }
  });
}
