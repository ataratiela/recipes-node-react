import React, { Component } from 'react';
import Thumbnail from '../views/Thumbnail';
import OwnRecipeFilterList from '../views/OwnRecipeFilterList';
import RecipeFilterList from '../views/RecipeFilterList';
import userStore from '../stores/user';

import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      userID: '',
      token: '',
      visibilityFilter: 'allRecipes',
      filters: {
        ownRecipeFilterList: 2,
        difficulty: 4,
        time: 10000,
        category: 10000        
      }
    }

    this.userStoreDidChange = this.userStoreDidChange.bind(this);
    this.handleOwnRecipes = this.handleOwnRecipes.bind(this);
    this.handleAllRecipes = this.handleAllRecipes.bind(this);
    this.setFilterList = this.setFilterList.bind(this);
  }

  componentDidMount() {
    const url = '/api/recipes';

    axios.get(url)
      .then(({ data }) => {
        this.setState({
          recipes: data
        })
      });
  }

  componentWillMount() {
    userStore.subscribe(this.userStoreDidChange);
    this.userStoreDidChange();
  }

  componentWillUnmount() {
    userStore.unsubscribe(this.userStoreDidChange);
  }

  userStoreDidChange() {
    const { id, token } = userStore.getState();
    this.setState({ userID: id, token: token });
  }

  handleOwnRecipes(event) {
    const { userID, token } = this.state;
    const url = '/api/users/' + userID + '/recipes';

    axios.get(url, {
      headers: { 'x-access-token': token },
      validateStatus: function (status) {
        return status >= 200 && status < 500;
      }
    }).then(({ data, status }) => {
      if (status >= 200 && status < 300) {
        this.setState({
          recipes: data, visibilityFilter: 'ownRecipes'
        });
      }
      else if (status >= 400 && status < 500) {
        //TODO: Handle client side error
      }
      else {
        console.error('Unexpected status received');
      }
    });
  }

  handleAllRecipes(event) {
    const url = '/api/recipes';

    axios.get(url)
      .then(({ data }) => {
        this.setState({
          recipes: data, visibilityFilter: 'allRecipes'
        })
      });
  }
  setFilterList(type, value) {
    let filters = Object.assign({}, this.state.filters);
    filters[type] = value;
    this.setState({
      filters: filters
    });
  }

  render() {
    const { recipes } = this.state;
    const { filters } = this.state;

    let recipeList = recipes.filter((r) => {
      return filters.difficulty === 4 || r.difficulty === filters.difficulty;
    });
    recipeList = recipeList.filter((r) => {      
      return r.prepTime < filters.time;
    });
    recipeList = recipeList.filter((r) => {
      return filters.category === 10000 || r.categoryID === filters.category;
    });

    recipeList = recipeList.map((r) => {
      return <Thumbnail 
        key={ r.recipeID } 
        { ...r }
      />
    });

    const ownRecipeFilter = this.state.userID
      ? <OwnRecipeFilterList
        userID={this.state.userID}
        handleOwnRecipes={this.handleOwnRecipes}
        handleAllRecipes={this.handleAllRecipes}
      />
      : null;

    return (
      <div className='container'>
        <div className='columns'>
          <div className='column-sidebar'>
            {ownRecipeFilter}
            <RecipeFilterList setFilterList={ this.setFilterList }  />
          </div>
          <div className="column-main">
            <div className='recipe-list'>
              {recipeList}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;