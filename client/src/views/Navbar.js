import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar(props) {
  return (
    <div className='Navbar'>
      <div className='nav-content full-width'>
        <div className='nav-primary'>
          <Link className='btn btn-nav' to='/'>Home</Link>
        </div>
        <div className='nav-secondary'>
          <Link className='btn btn-fill' to='/'>Log Out</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;