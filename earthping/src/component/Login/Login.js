import React from 'react';
import './Login.css';
import earthDraw from '../../assets/images/cE.png'
import SignupForm from '../SignupForm/SignupForm';

function Login() {
  return (
    <div>
      <div className='lgBox'>
        <div className='leftGrid'>
          <img src={earthDraw} alt='Drawing of planet earth' />
        {/* <p>Planet earth draw</p> */}
        </div>
        <div className='rightGrid'>
          <SignupForm />

        </div>
      </div>
    </div>
  );
}

export default Login;