import React from 'react';
import './LandingHeader.css';

function LandingHeader() {
  return (
    <header className='header'>
      <h1>Earth.Pinged</h1>
      <nav className='navigation'>
        <ul className="headList">
          {/* <li><a href="/about">About</a></li> */}
          {/* <li><a href="/contact">Contact</a></li> */}
          <li><a className="login" href="/connnection">Login / burger</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default LandingHeader;