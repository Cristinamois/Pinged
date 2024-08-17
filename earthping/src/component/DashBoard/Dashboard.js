// Dashboard.js
import React from 'react';
import './Dashboard.css';
import Header from '../Header/Header.js';
import MapComponent from '../Map/Map.js';

function Dashboard() {
  return (
    <div className='Dashboard'>
        <Header />
        <MapComponent />
        <div className="buttons-container">
            <button className="button-arounder">About</button>
        </div>
    </div>
  );
}

export default Dashboard;
