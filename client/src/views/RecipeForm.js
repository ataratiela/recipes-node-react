import React from 'react';
import Header from './Header';

const difficultyNames = ['Very Easy', 'Easy', 'Medium', 'Hard', 'Master Chef'];

function RecipeForm(props) {
  const {
    name, description, image, difficulty,
    diners, prepTime, category, steps
  } = props.recipe;

  const recipeImage = image
    ? <img className='recipe-form-image' src={'data:image/png;' + image} alt='Recipe' />
    : <div className='recipe-image-placeholder'>Select Image...</div>;

  const categories = props.categories.map(c => {
    return <option key={c.categoryID} value={c.categoryID}>{c.name}</option>
  });

  const difficultyRadios = Array(5).fill(null).map((_, i) => {
    const index = String(i);
    return (
      <label key={i}>
        <input
          type='radio'
          name='difficulty'
          value={i}
          checked={difficulty === index}
          onChange={props.handleInputChange} />
        {difficultyNames[i]}
      </label> );
  });

  const stepInputs = steps.map((s, i, arr) => {
    return <div key={s.id} className='input-row input--with-addons'>
      <input
        name={'step-' + s.id}
        type='text'
        placeholder='Step'
        value={s.value}
        onChange={props.handleStepChange} />

      {(i === arr.length - 1)
        ? <button name={'addstep-' + (s.id + 1)} type='button' className='btn btn-addon' onClick={props.handleAddState}>+</button>
        : <button name={'rmvstep-' + s.id} type='button' className='btn btn-addon' onClick={props.handleRemoveState}>-</button>
      }
    </div>
  });

  return (
    <form onSubmit={props.submit} onReset={props.reset}>
    <Header title='Create New Recipe' />
      <div className='input-row columns'>
        <div className='recipe-form-image-container'>
          <label>
            <input
              name='image'
              type='file'
              onChange={props.handleImageChange} />
            {recipeImage}
          </label>
        </div>
        <div className='recipe-form-main-description'>
          <div className='input-row'>
            <input
              name='name'
              type='text'
              placeholder='Name'
              value={name}
              onChange={props.handleInputChange} />
          </div>
          <div className='input-row'>
            <textarea
              name='description'
              placeholder='Recipe description...'
              rows='3'
              value={description}
              onChange={props.handleInputChange} />
          </div>
          <div className='input-row'>
            <select defaultValue='' value={category} onChange={props.handleInputChange}>
              <option value='' hidden>Category</option>
              {categories}
            </select>            
          </div>
        </div>
      </div>

      <div className='input-row'>
        <input
          name='diners'
          placeholder='Diners'
          type='number'
          min='1'
          step='1'
          value={diners}
          onChange={props.handleInputChange} />
      </div>

      <div className='input-row'>
        <input
          name='prepTime'
          placeholder='Preparation Time'
          type='number'
          min='0'
          value={prepTime}
          onChange={props.handleInputChange} />
      </div>

      <div className='input-row'>
        <span className="rating">
          Difficulty
          {difficultyRadios}
        </span>
      </div>

      <Header title='Steps' />
      {stepInputs}

      <div className='form-actions'>
        <input className='btn btn-fill' type="submit" value="Create" />
        <input className='btn' type="reset" value="Reset" />
      </div>
    </form>
  );
}

export default RecipeForm;