import React, { Component } from 'react';
import Thumbnail from '../views/Thumbnail';
import RecipeFilterList from '../views/RecipeFilterList';

import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    }
  }

  componentDidMount() {
    const url = '/recipes';

    axios.get(url)
      .then(({ data }) => {
        this.setState({
          recipes: data
        })
      });
  }

  render() {
    const { recipes } = this.state;
    const recipeList = recipes.map((r) => {
      return <Thumbnail 
        key={ r.recipeID } 
        { ...r }
      />
    });

    return (
      <div className='container'>
        <div className='columns'>
          <div className='column-sidebar'>
            <RecipeFilterList />
          </div>
          <div className="column-main">
            <div className='recipe-list'>
              { recipeList }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Recipes;