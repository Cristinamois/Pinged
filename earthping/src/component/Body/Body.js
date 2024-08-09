import React from 'react';
import './Body.css';
import MapComponent from '../Map/Map';

function Body() {
  return (
    <div className='grid-container'>
        <div className="left-column">
            <MapComponent />
        </div>
        <div className="separator"></div>
        <div className="right-column">
            <p>Colonne droite</p>
            <p>test 2</p>
        </div>
    </div>
  );
}

export default Body;