import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar(props) {
  return (
    <div className='Navbar'>
      <div className='nav-content full-width'>
        <div className='nav-primary'>
          <NavLink
            to="/"
            className='btn btn-nav'
            activeClassName="selected"
          >Home</NavLink>
        </div>
        <div className='nav-secondary'>
          <Link className='btn btn-fill' to='/'>Log Out</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar;