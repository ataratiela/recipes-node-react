import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';
import Recipes from './Recipes';
import Recipe from './Recipe';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={ Recipes }/>
          <Route path="/recipe/:id" component={ Recipe }/>
        </div>
      </Router>
    );
  }
}

export default App;