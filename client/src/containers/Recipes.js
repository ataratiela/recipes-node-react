import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Header from '../views/Header';
import Thumbnail from '../views/Thumbnail';
import axios from 'axios';

import '../styles/Recipes.css';

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
        id={ r.recipeID } 
        image={ r.image } 
        title={ r.name } 
        description={ r.description } 
        mainLink={ <Link className='btn btn-fill' to={ '/recipes/' + r.recipeID }>Show</Link> }
      />
    })

    const headerLink = <Link to='/recipes/new'>new recipe ></Link>;

    return (
      <div className='content full-width'>
        <Header title='Recipes' link={ headerLink } />
        <div className="Recipes">{ recipeList }</div>
      </div>
    );
  }
}

export default Recipes;