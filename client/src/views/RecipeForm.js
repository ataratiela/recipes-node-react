import React from 'react';

function RecipeForm (props) {
  const { 
    name, description, image, difficulty, 
    diners, prepTime, category 
  } = props;

  const categories = props.categories.map(c => {
    return <option key={ c.categoryID } value={ c.categoryID }>{ c.name }</option>
  });

  return (
    <form onSubmit={ props.submit }>
      <input
        name='name'
        type='text'
        placeholder='Recipe name...'
        value={ name } />
      <textarea
        name='description'
        placeholder='Recipe description...'
        value={ description } />
      <label>
        Recipe image:
        <input
          name='image'
          type='file'
          value={ image } />
      </label>
      <label>
        Category:
        <select value={ category } onChange={ props.handleCategoryChange }>
          { categories }
        </select>
      </label>
      <label>
        Diners:
        <input
          name='diners'
          type='number'
          min='1'
          step='1'
          value={ diners } />
      </label>
      <label>
        Preparation time:
        <input
          name='prepTime'
          type='number'
          min='0'
          value={ prepTime } />
      </label>
      <label>
        Difficulty:
        <input
          name='difficulty-1'
          type='checkbox'
          checked={ difficulty >= 1 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-2'
          type='checkbox'
          checked={ difficulty >= 2 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-3'
          type='checkbox'
          checked={ difficulty >= 3 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-4'
          type='checkbox'
          checked={ difficulty >= 4 }
          onChange={ props.handleDifficultyChange } />
        <input
          name='difficulty-5'
          type='checkbox'
          checked={ difficulty >= 5 }
          onChange={ props.handleDifficultyChange } />
      </label>
      <input type="submit" value="Create Recipe" />
    </form>
  );
}

export default RecipeForm;