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
    </div>
  );
}

export default LandingPage;