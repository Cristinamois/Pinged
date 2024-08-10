import React from 'react';
import './Body.css';
import MapComponent from '../Map/Map';
import RLateralBox from '../RLateralBox/RLateralBox';

function Body() {
  return (
    <div className='grid-container'>
        <div className="left-column">
            <MapComponent />
        </div>
        <div className="separator"></div>
        <div className="right-column">
            <RLateralBox />
        </div>
    </div>
  );
}

export default Body;