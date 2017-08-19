import React from 'react';
import '../styles/Thumbnail.css';

function Thumbnail(props) {
  return (
    <div className='Thumbnail'>
      <img src={ props.image } alt='Recipe'></img>
      <div className='Caption'>
        <h3>{ props.title }</h3>
        <p>{ props.description }</p>
        <div className='action-holder'>
          { props.mainLink }
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;