import React from 'react';
import './Login.css';
import earthDraw from '../../assets/images/cE.png'
import LoginForm from '../LoginForm/LoginForm';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div className='signup-container-all'>
      <div className='lgBox'>
        <div className='leftGrid'>
        <Link to="/" className='link'>&lt;- Back</Link>
          {/* <p>&lt;- Back</p> */}
          <img src={earthDraw} alt='Drawing of planet earth' />
        {/* <p>Planet earth draw</p> */}
        </div>
        <div className='rightGrid'>
          <LoginForm />
          <p className='bottom-text'>Don't have an account? <a href='/signup'>Sign up</a></p>

        </div>
      </div>
    </div>
  );
}

export default Login;