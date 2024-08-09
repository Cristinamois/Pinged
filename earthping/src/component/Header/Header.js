import React from 'react';
import './Header.css';

function Header() {
  return (
    <header className='header'>
      <h1>Earth.Pinged</h1>
      <nav className='navigation'>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/connnection">Connection</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;