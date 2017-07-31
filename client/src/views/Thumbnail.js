import React from 'react';
import {
  Link
} from 'react-router-dom';
import '../styles/Thumbnail.css';

function Thumbnail(props) {
  const route = '/recipe/' + props.id;

  return (
    <div className='Thumbnail'>
      <img src={ props.image } alt='Recipe'></img>
      <div className='Caption'>
        <h3>{ props.title }</h3>
        <p>{ props.description }</p>
        <div className='action-holder'>
          { /* <a className='btn btn-fill' href='#'>Show</a> */ }
          <Link className='btn btn-fill' to={ route }>Show</Link>
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;