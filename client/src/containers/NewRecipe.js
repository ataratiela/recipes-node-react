import React, { Component } from 'react';
import RecipeForm from '../views/RecipeForm';

import axios from 'axios';

class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {
        name: '',
        description: '',
        image: '',
        difficulty: null,
        diners: null,
        prepTime: null,
        category: 1
      },
      categories: []
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCategoryChange = this.handleCategoryChange.bind(this);
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this);
  }

  componentDidMount() {
    const url = '/categories';

    axios.get(url)
      .then(({ data }) => {
        this.setState({
          categories: data
        })
      });
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleCategoryChange(event) {
    const category = event.target.value;
    let recipe = Object.assign({}, this.state.recipe);

    recipe.category = category;

    this.setState({ recipe: recipe });
  }

  handleDifficultyChange(event) {
    const difficulty = event.target.name;
    let recipe = Object.assign({}, this.state.recipe);

    recipe.difficulty = Number(difficulty.split('-').pop());

    this.setState({ recipe: recipe });
  }

  render() {
    const recipe = this.state.recipe;

    return (
      <div className='content full-width'>
        <RecipeForm
          name={ recipe.name }
          description={ recipe.description }
          image={ recipe.image }
          difficulty={ recipe.difficulty }
          diners={ recipe.diners }
          prepTime={ recipe.prepTime }
          category={ recipe.category }
          submit={ this.handleSubmit } 
          handleDifficultyChange={ this.handleDifficultyChange } />
      </div>
    );
  }
}

export default NewRecipe;