import React, { Component } from 'react';
import { Redirect } from 'react-router';

import RecipeForm from '../views/RecipeForm';

import axios from 'axios';

function readFile(file, done) {
  let reader = new FileReader();

  reader.onload = function (readerEvt) {
    done(reader.result);
  };

  reader.readAsDataURL(file);
}

class NewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipe: {
        name: '',
        description: '',
        image: '',
        difficulty: '',
        diners: '',
        prepTime: '',
        categoryID: 0
      },
      categories: [],
      createdRecipe: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
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
    const url = '/recipes';

    event.preventDefault();

    axios.post(url, this.state.recipe)
      .then(response => {
        this.setState({ createdRecipe: response.data.id });
      });
  }

  handleReset(event) {
    const recipe = {
      name: '',
      description: '',
      image: '',
      difficulty: '',
      diners: '',
      prepTime: '',
      categoryID: 0
    };

    this.setState({ recipe });
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    let recipe = Object.assign({}, this.state.recipe);

    switch (target.type) {
      case 'select-one':
        recipe.categoryID = target.value;
        break;
      default:
        recipe[name] = target.value;
        break;
    }

    this.setState({ recipe: recipe });
  }

  handleImageChange(event) {
    const image = event.target.files[0];

    if(image) {
      readFile(image, (imageBase64) => {
        let recipe = Object.assign({}, this.state.recipe);

        recipe.image = imageBase64;

        this.setState({ recipe: recipe });
      });
    }
    else {
      let recipe = Object.assign({}, this.state.recipe);

      recipe.image = '';

      this.setState({ recipe: recipe });
    }
  }

  render() {
    return (
      this.state.createdRecipe
        ? <Redirect to={ '/recipes/' + this.state.createdRecipe } />
        : <div className='content content-form full-width' >
            <RecipeForm
              recipe={ this.state.recipe }
              categories={ this.state.categories }
              submit={ this.handleSubmit }
              reset={ this.handleReset }
              handleInputChange={ this.handleInputChange }
              handleImageChange={ this.handleImageChange } />
          </div >
    );
  }
}

export default NewRecipe;