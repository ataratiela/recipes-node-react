import React from 'react';

function RecipeForm (props) {
  return (
    <form onSubmit={ props.submit }>
      <input
        name='name'
        type='text'
        placeholder='Recipe name...'
        value={ props.name } />
      <textarea
        name='description'
        placeholder='Recipe description...'
        value={ props.description } />
      <label>
        Recipe image:
        <input
          name='image'
          type='file'
          value={ props.image } />
      </label>
      <label>
        Diners:
        <input
          name='diners'
          type='number'
          min='1'
          step='1'
          value={ props.image } />
      </label>
      <label>
        Difficulty:
        <input
          name='difficulty-1'
          type='checkbox'
          checked={ props.difficulty >= 1 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-2'
          type='checkbox'
          checked={ props.difficulty >= 2 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-3'
          type='checkbox'
          checked={ props.difficulty >= 3 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-4'
          type='checkbox'
          checked={ props.difficulty >= 4 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-5'
          type='checkbox'
          checked={ props.difficulty >= 5 }
          onChange={ props.handleDifficultyChange } />
      </label>
      <input type="submit" value="Create Recipe" />
    </form>
  );
}

export default RecipeForm;