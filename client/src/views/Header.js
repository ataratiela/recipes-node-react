import React from 'react';

function Header(props) {
  return (
    <header className='main-header'>
      <span>{ props.title }</span>
      <div className='meta'>{ props.link }</div>
    </header>
  );
}

export default Header;