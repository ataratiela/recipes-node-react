import React from 'react';

function RecipeForm (props) {
  return (
    <form onSubmit={ props.submit }>
      <input
        name='name'
        type='text'
        placeholder='Recipe Name'
        value={ props.name } />
      <input type="submit" value="Create Recipe" />
    </form>
  );
}

export default RecipeForm;