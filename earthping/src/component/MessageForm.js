// src/component/MessageForm.js
import React, { useState } from 'react';

function MessageForm() {
  const [message, setMessage] = useState('');

  // Fonction pour envoyer le message au backend
  async function sendMessage() {
    try {
      const response = await fetch('http://localhost:3001/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Message envoyé:', data);
        setMessage(''); // Réinitialiser le champ de message après l'envoi
      } else {
        console.error('Erreur lors de l\'envoi du message');
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  }

  // Gestion de la soumission du formulaire
  function handleSubmit(e) {
    e.preventDefault();
    if (message) {
      sendMessage(); // Appeler la fonction pour envoyer le message
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows="3"
        placeholder="Tapez votre message ici..."
      ></textarea>
      <button type="submit">Envoyer</button>
    </form>
  );
}

export default MessageForm;
