import React, { Component } from 'react';
import { Redirect } from 'react-router';

import RecipeForm from '../views/RecipeForm';

import userStore from '../stores/user';

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
      user: null,
      recipe: {
        name: '',
        description: '',
        image: '',
        difficulty: '',
        diners: '',
        prepTime: '',
        categoryID: 0,
        steps: [{ id: 0, value: ''}]
      },
      categories: [],
      createdRecipe: null
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleImageChange = this.handleImageChange.bind(this);
    this.handleStateChange = this.handleStateChange.bind(this);
    this.handleAddState = this.handleAddState.bind(this);
    this.handleRemoveState = this.handleRemoveState.bind(this);
  }

  componentWillMount() {
    const url = '/api/categories';

    axios.get(url)
      .then(({ data }) => {
        this.setState({
          categories: data
        })
      });

    userStore.subscribe(this.userStoreDidChange);
    this.userStoreDidChange();
  }

  componentWillUnmount(){
    userStore.unsubscribe(this.userStoreDidChange);
  }

  userStoreDidChange(){
    const user = userStore.getState();
    this.setState({ user });
  }

  handleSubmit(event) {
    const { id, token } = this.state.user;
    const url = '/api/users/' + id + '/recipes';

    event.preventDefault();

    axios.post(url, this.state.recipe, {
      headers: { 'x-access-token': token },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    }).then(({ data, status }) => {
      if(status >= 200 && status < 300) {
        this.setState({ createdRecipe: data.id });
      }
      else if(status >= 400 && status < 500) {
        //TODO: Handle client side error
      }
      else {
        console.error('Unexpected status received');
      }
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
      categoryID: 0,
      steps: [{ id: 0, value: ''}]
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

  handleStateChange(event) {
    const target = event.target;
    const name = target.name;
    const id = Number(name.split('-')[1]);
    let recipe = Object.assign({}, this.state.recipe);

    recipe.steps.find(s => s.id === id).value = target.value;

    this.setState({ recipe });
  }

  handleAddState(event) {
    const target = event.target;
    const name = target.name;
    const id = Number(name.split('-')[1]);
    let recipe = Object.assign({}, this.state.recipe);

    recipe.steps.push({ id, value: '' });

    this.setState({ recipe });
  }

  handleRemoveState(event) {
    const target = event.target;
    const name = target.name;
    const index = Number(name.split('-')[1]);
    let recipe = Object.assign({}, this.state.recipe);

    recipe.steps = recipe.steps.filter(s => s.id !== index);

    this.setState({ recipe });
  }

  render() {
    return (
      this.state.createdRecipe
        ? <Redirect to={ '/recipes/' + this.state.createdRecipe } />
        : <div className='container' >
            <div className='container--new-recipe' >
              <RecipeForm
                recipe={ this.state.recipe }
                categories={ this.state.categories }
                submit={ this.handleSubmit }
                reset={ this.handleReset }
                handleInputChange={ this.handleInputChange }
                handleImageChange={ this.handleImageChange } 
                handleStepChange={ this.handleStateChange } 
                handleAddState={ this.handleAddState } 
                handleRemoveState={ this.handleRemoveState } />
            </div >
          </div >
    );
  }
}

export default NewRecipe;