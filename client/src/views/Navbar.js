import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar(props) {
  const { user } = props;

  const userNav = user
    ? <ul>
        <li>
          <span>{ user }</span>
        </li>
        <li>
          <Link className='btn btn-fill' to={'/login'}>Logout</Link>
        </li>
      </ul> 
    : <ul>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link className='btn btn-fill' to={'/register'}>Sign Up</Link>
        </li>
      </ul>
      
  return (
    <div className='navbar'>
      <div className='container center-flex'>
        <div className='nav-logo'>
          <NavLink
            exact
            to="/recipes"
            className='btn btn-nav'
            activeClassName="selected">
              FoodTouristic
            </NavLink>
        </div>
        <div className='nav-filler' />
        <div className='user-nav'>
          { userNav }
        </div>
      </div>
    </div>
  );
}

export default Navbar;