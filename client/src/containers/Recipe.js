import React, { Component } from 'react';

import axios from 'axios';

import '../styles/Recipes.css';

class Recipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: []
    }
  }

  componentWillMount() {
    axios.get('/recipes/' + this.props.match.params.id)
      .then(({ data }) => {
        this.setState({ recipe: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className='content full-width'>
        <h3>{this.state.recipe.name}</h3>
        <img src={this.state.recipe.image} alt='Recipe'></img>
        <p>{this.state.recipe.description}</p>
        <p>Number of diners: {this.state.recipe.diners}</p>
        <p>Preparation time: {this.state.recipe.prepTime} minutes</p>
      </div>
    );
  }
}

export default Recipe;