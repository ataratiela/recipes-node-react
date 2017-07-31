import React from 'react';
import '../styles/Header.css';

function Header(props) {
  return (
    <header className='Header'>
      <span>{ props.title }</span>
    </header>
  );
}

export default Header;