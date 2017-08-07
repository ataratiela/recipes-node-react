import React, { Component } from 'react';
import RecipeForm from '../views/RecipeForm';

class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      image: null,
      difficulty: null,
      diners: null,
      prepTime: null,
      category: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target);
  }

  render() {
    return (
      <div className='content full-width'>
        <RecipeForm
          name={ this.state.name }
          description={ this.state.description }
          image={ this.state.image }
          difficulty={ this.state.difficulty }
          diners={ this.state.diners }
          prepTime={ this.state.prepTime }
          category={ this.state.category }
          submit={ this.handleSubmit } />
      </div>
    );
  }
}

export default NewRecipe;