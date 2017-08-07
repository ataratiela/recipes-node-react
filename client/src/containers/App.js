import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Navbar from '../views/Navbar';
import Recipe from './Recipe';
import Recipes from './Recipes';
import NewRecipe from './NewRecipe';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Navbar />

          <Route exact path="/" component={ Recipes }/>
          <Route exact path="/recipe/:id" component={ Recipe }/>
          <Route exact path="/recipes/new" component={ NewRecipe }/>
        </div>
      </Router>
    );
  }
}

export default App;