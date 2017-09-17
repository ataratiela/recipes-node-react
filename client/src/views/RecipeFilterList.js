import React from 'react';

function RecipeFilterList(props) {
  return (
    <div>
      Filter by
      <br />
      <label>
        <input type="radio" name="filterRecipes"
          value='ownRecipes'
          id='ownRecipes'
          checked={props.checked === 'ownRecipes'}
          onChange={props.handleOwnRecipes} />
        Own recipes
      </label>
      <br />
      <label>
        <input type="radio" name="filterRecipes"
        checked={props.checked === 'allRecipes'}
          value='allRecipes'
          id='allRecipes'
          onChange={props.handleAllRecipes} />
        All recipes
      </label>
    </div>
  );
}

export default RecipeFilterList;