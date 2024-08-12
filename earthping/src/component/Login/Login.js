import React from 'react';
import './Login.css';
import earthDraw from '../../assets/images/cE.png'

function Login() {
  return (
    <div>
      <div className='lgBox'>
        <div className='leftGrid'>
          <img src={earthDraw} alt='Drawing of planet earth' />
        {/* <p>Planet earth draw</p> */}
        </div>
        <div className='rightGrid'>
          <h3>Log in</h3>

        </div>
      </div>
    </div>
  );
}

export default Login;