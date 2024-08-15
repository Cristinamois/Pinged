import React from 'react';
import './Signup.css'
import earthDraw from '../../assets/images/cE.png'
import SignupForm from '../SignupForm/SignupForm';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className='signup-container-all'>
      <div className='lgBox'>
        <div className='leftGrid'>
        <Link to="/" className='link'>&lt;- Back</Link>
          <img src={earthDraw} alt='Drawing of planet earth' />
        {/* <p>Planet earth draw</p> */}
        </div>
        <div className='rightGrid'>
          <SignupForm />
          <p className='bottom-text'>Already have an account? <a href='/login'>Login here</a></p>

        </div>
      </div>
    </div>
  );
}

export default Signup;