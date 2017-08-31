import React from 'react';

function RecipeForm(props) {
  const {
    name, description, image, difficulty,
    diners, prepTime, category, steps
  } = props.recipe;

  const recipeImage = image
    ? <img className='recipe-form-image' src={ 'data:image/png;' + image } alt='Recipe' />
    : null;

  const categories = props.categories.map(c => {
    return <option key={ c.categoryID } value={ c.categoryID }>{ c.name }</option>
  });

  const stepInputs = steps.map((s, i, arr) => {
    return <div key={ s.id } className='step-input-container'>
        <input
          name={ 'step-' + s.id }
          type='text'
          placeholder='Step'
          value={ s.value }
          onChange={ props.handleStepChange } />

        { (i === arr.length - 1) 
            ? <button name={ 'addstep-' + (s.id + 1) } type='button' className='btn btn-secondary' onClick={ props.handleAddState }>+</button>
            : <button name={ 'rmvstep-' + s.id } type='button' className='btn btn-secondary' onClick={ props.handleRemoveState }>-</button>
        }
      </div>
  });


  return (
    <form onSubmit={ props.submit } onReset={ props.reset }>
      <input
        name='name'
        type='text'
        placeholder='Name'
        value={ name }
        onChange={ props.handleInputChange } />

      <label>
        Recipe image
        <input
          name='image'
          type='file'
          onChange={ props.handleImageChange } />
        { recipeImage }
      </label>

      <textarea
        name='description'
        placeholder='Recipe description...'
        rows='5'
        value={ description }
        onChange={ props.handleInputChange } />

      <div className='form-select'>
        <select defaultValue='' value={ category } onChange={ props.handleInputChange }>
          <option value='' hidden>Category</option>
          { categories }
        </select>
      </div>

      <label>
        Diners:
        <input
          name='diners'
          type='number'
          min='1'
          step='1'
          value={ diners }
          onChange={ props.handleInputChange } />
      </label>

      <label>
        Preparation time:
        <input
          name='prepTime'
          type='number'
          min='0'
          value={ prepTime }
          onChange={ props.handleInputChange } />
      </label>

      <span className="rating">
        Difficulty
        <input
          id='difficulty-5'
          type="radio"
          name='difficulty'
          value='5'
          checked={ difficulty === '5' }
          onChange={ props.handleInputChange }
          className="rating-input" />
        <label htmlFor='difficulty-5' className='rating-star' />
        <input
          id='difficulty-4'
          type="radio"
          name='difficulty'
          value='4'
          checked={ difficulty === '4' }
          onChange={ props.handleInputChange }
          className="rating-input" />
        <label htmlFor='difficulty-4' className='rating-star' />
        <input
          id='difficulty-3'
          type="radio"
          name='difficulty'
          value='3'
          checked={ difficulty === '3' }
          onChange={ props.handleInputChange }
          className="rating-input" />
        <label htmlFor='difficulty-3' className='rating-star' />
        <input
          id='difficulty-2'
          type="radio"
          name='difficulty'
          value='2'
          checked={ difficulty === '2' }
          onChange={ props.handleInputChange }
          className="rating-input" />
        <label htmlFor='difficulty-2' className='rating-star' />
        <input
          id='difficulty-1'
          type="radio"
          name='difficulty'
          value='1'
          checked={ difficulty === '1' }
          onChange={ props.handleInputChange }
          className="rating-input" />
        <label htmlFor='difficulty-1' className='rating-star' />
      </span>
      
      <label>Steps</label>
      { stepInputs }

      <div className='form-btns'>
        <input className='btn btn-fill' type="submit" value="Create" />
        <input className='btn btn-secondary' type="reset" value="Reset" />
      </div>
    </form>
  );
}

export default RecipeForm;