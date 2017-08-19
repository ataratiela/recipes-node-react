import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Link
} from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar(props) {
  const { user, onLogin, onLogout } = props;

  const rightButtons = user 
    ? <div>
        <span>{ user }</span>
        <button className='btn btn-fill' onClick={ onLogout }>Log Out</button>
      </div>
    : <button className='btn btn-fill' onClick={ onLogin }><Link to={'/login'}>Register now</Link></button> 

  return (
    <div className='Navbar'>
      <div className='nav-content full-width'>
        <div className='nav-primary'>
          <NavLink
            exact
            to="/recipes"
            className='btn btn-nav'
            activeClassName="selected"
          >Home</NavLink>
        </div>
        <div className='nav-secondary'>
          { rightButtons }
        </div>
      </div>
    </div>
  );
}

export default Navbar;