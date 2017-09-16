import React from 'react';

function RecipeFilterList(props) {
  return (
    <div>
      Refine by

      <form onSubmit={props.onFormSubmit}>
        <label>
          <input type="radio" name="ownRecipes"
            value='ownRecipes'
            checked={props.onInputChange}
            onChange={props.handleOwnRecipes} />
          Own recipes
        </label>
        <br />
        <label>
          <input type="radio" name="ownRecipes"
            value='ownRecipes'
            checked={props.onInputChange}
            onChange={props.handleAllRecipes} />
          All recipes
        </label>
      </form>
    </div>
  );
}

export default RecipeFilterList;