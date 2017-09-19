import React, { Component } from 'react';
import Thumbnail from '../views/Thumbnail';
import OwnRecipeFilterList from '../views/OwnRecipeFilterList';
import userStore from '../stores/user';

import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      userID: '',
      token: '',
      visibilityFilter: 'allRecipes'
    }

    this.userStoreDidChange = this.userStoreDidChange.bind(this);
    this.handleOwnRecipes = this.handleOwnRecipes.bind(this);
    this.handleAllRecipes = this.handleAllRecipes.bind(this);
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

  render() {
    const { recipes } = this.state;
    const recipeList = recipes.map((r) => {
      return <Thumbnail
        key={r.recipeID}
        { ...r }
      />
    });

    const ownRecipeFilter = this.state.userID
      ? <OwnRecipeFilterList
        userID={this.state.userID}
        visibilityFilter={this.state.visibilityFilter}
        handleOwnRecipes={this.handleOwnRecipes}
        handleAllRecipes={this.handleAllRecipes}
      />
      : null;

    return (
      <div className='container'>
        <div className='columns'>
          <div className='column-sidebar'>
            {ownRecipeFilter}
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