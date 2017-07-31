import React from 'react';
import '../styles/Header.css';

function Header(props) {
  return (
    <header className='Header'>
      <span>{ props.title }</span>
      <div className='meta'>{ props.link }</div>
    </header>
  );
}

export default Header;