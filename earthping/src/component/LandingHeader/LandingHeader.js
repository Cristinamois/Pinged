import React from 'react';
// import Signup from '../Signup/Signup';
import './LandingHeader.css';
import { Link } from 'react-router-dom';

function LandingHeader() {
  return (
    <header className='header'>
      <h1>Earth.Pinged</h1>
      <nav className='navigation'>
        <ul className="headList">
          <li><Link to="/signup">Sign up here</Link></li> {/* Lien vers la page signup */}
        </ul>
      </nav>
    </header>
  );
}

export default LandingHeader;