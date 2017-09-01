import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar(props) {
  const { user, handleLogout } = props;

  const userNav = user
    ? <ul>
        <li>
          <span>{ user }</span>
        </li>
        <li>
          <button className='btn btn-fill' onClick={ handleLogout }>Logout</button>
        </li>
      </ul> 
    : <ul>
        <li>
          <Link className='btn' to={'/login'}>Login</Link>
        </li>
        <li>
          <Link className='btn btn-fill' to={'/register'}>Sign Up</Link>
        </li>
      </ul>

  const actionNav = user
    ? <ul>
        <li>
          <Link className='btn' to={'/recipes/new'}>Create Recipe</Link>
        </li>
      </ul> 
    : <ul>
      </ul>
      
  return (
    <div className='navbar'>
      <div className='container center-flex'>
        <div className='nav-logo'>
          <NavLink
            exact
            to="/recipes"
            className='btn'
            activeClassName="selected">
              FoodTouristic
            </NavLink>
        </div>
        <div className='action-nav'>
          { actionNav }
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