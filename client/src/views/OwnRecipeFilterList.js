import React from 'react';

function OwnRecipeFilterList(props) {
  return (
    <div>
      Filter by
      <br />
      <label>
        <input type="radio" name="filterRecipes"
          value='ownRecipes'
          id='ownRecipes'
          checked={props.visibilityFilter === 'ownRecipes'}
          onChange={props.handleOwnRecipes} />
        Own recipes
      </label>
      <br />
      <label>
        <input type="radio" name="filterRecipes"
          value='allRecipes'
          id='allRecipes'
          checked={props.visibilityFilter === 'allRecipes'}
          onChange={props.handleAllRecipes} />
        All recipes
      </label>
    </div>
  );
}

export default OwnRecipeFilterList;