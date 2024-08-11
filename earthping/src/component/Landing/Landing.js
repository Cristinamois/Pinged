import React from 'react';
// import './Header.css';
import './Landing.js'
import './Landing.css'
import LandingHeader from '../LandingHeader/LandingHeader.js';
import MapComponent from '../Map/Map.js';

function LandingPage() {
  return (
    <div className='LandingPage'>
        <LandingHeader />
        <MapComponent />
        <div class="buttons-container">
            <button class="button-arounder">About</button>
        </div>
    </div>
  );
}

export default LandingPage;

