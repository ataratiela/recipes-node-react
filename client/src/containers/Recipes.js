import React, { Component } from 'react';
import Thumbnail from '../views/Thumbnail';
import RecipeFilterList from '../views/RecipeFilterList';

import axios from 'axios';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      filters: {
        difficulty: 4,
        time: 10000,
        category: 10000
      }
    }
    this.setFilterList = this.setFilterList.bind(this);
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

    return (
      <div className='container'>
        <div className='columns'>
          <div className='column-sidebar'>
            <RecipeFilterList setFilterList={ this.setFilterList }  />
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