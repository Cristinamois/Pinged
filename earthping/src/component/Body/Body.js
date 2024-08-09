import React from 'react';
import './Body.css';
import MapComponent from '../Map/Map';

function Body() {
  return (
    <div className='grid-container'>

        <div id="left-column">
            <MapComponent />
        </div>
        <div class="separator"></div>
        <div class="right-column">
            <p>Colonne droite</p>
        </div>
    </div>
  );
}

export default Body;