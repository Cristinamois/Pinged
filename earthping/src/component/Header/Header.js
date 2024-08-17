// Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Pour la redirection
import axios from 'axios';
import './Header.css';
import profilepicture from '../../assets/images/pp.jpg'

function Header() {
  const navigate = useNavigate(); // Initialiser useNavigate

  const handleLogout = async () => {
    try {
      // Envoyer une requête POST au backend pour se déconnecter
      await axios.post('http://localhost:3001/api/logout');
      
      // Supprimer les informations de session ou de token
      localStorage.removeItem('authToken'); // Par exemple, si vous stockez le token dans localStorage
      
      // Rediriger vers la page d'accueil après la déconnexion
      navigate('/');
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <header className='header'>
      <h1>Earth.Pinged</h1>
      <nav className='navigation'>
        <ul className="headList">
          {/* <li><a href="/">Home</a></li> */}
          <li>
            <img src={profilepicture} alt='profile' className='profileimage'/>
          </li>
          <li>
            <button className="login" onClick={handleLogout}>Log out</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
