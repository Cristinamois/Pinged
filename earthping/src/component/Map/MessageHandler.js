import L from 'leaflet';

export function displayMessage(map, position, message, duration = 10 * 1000) { // 10 secondes par défaut
  const popupContent = `
    <div id="popup-content">
      <p>${message}</p>
    </div>
  `;

  const popup = L.popup({ closeOnClick: false, autoClose: false })
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  setTimeout(() => {
    map.removeLayer(popup);
    createPopup(map, position); // Réaffiche le formulaire après l'expiration du message
  }, duration);
}

export function createPopup(map, position) {
  const popupContent = `
    <div id="popup-content">
      <form id="message-form">
        <textarea id="message-input" rows="3" cols="20" placeholder="Enter a message"></textarea>
        <button type="submit">Save</button>
      </form>
    </div>
  `;

  const popup = L.popup({ closeOnClick: false, autoClose: false })
    .setLatLng(position)
    .setContent(popupContent)
    .openOn(map);

  document.getElementById('message-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const message = document.getElementById('message-input').value;
    if (message) {
      // Remplace le contenu du popup avec le message
      popup.setContent(`<p>${message}</p>`).update();

      // Affiche le message et le cache après 10 secondes
      displayMessage(map, position, message);
    }
  });
}
