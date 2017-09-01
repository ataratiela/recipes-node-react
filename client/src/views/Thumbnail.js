import React from 'react';
import { Link } from 'react-router-dom';

function Thumbnail(props) {
  const { recipeID, name, image, author } = props;

  const authorEl = !author
    ? <div className='thumbnail-author'>
        <img
          className='thumbnail-author-image'
          src={ author ? author.image : '/imgs/default-avatar.jpg' }
          alt='Author' />
        <span>Sergio{ /*author.name*/ }</span>
      </div> 
    : null;

  return (
    <div className='thumbnail'>
      <div className='thumbnail-content'>
        <div className='thumbnail-header'>
          { authorEl }
        </div>
        <img className='thumbnail-main-image' src={ image } alt='Recipe'></img>
        <div className='thumbnail-title'>
          <Link to={ '/recipes/' + recipeID }>{ name }</Link>
        </div>
        <div className='thumbnail-action'>
        </div>
      </div>
    </div>
  );
}

export default Thumbnail;