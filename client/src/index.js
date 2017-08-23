import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import App from './containers/App';
import Recipe from './containers/Recipe';
import Recipes from './containers/Recipes';
import NewRecipe from './containers/NewRecipe';
import Authorization from './containers/Authorization';
import Login from './containers/Login';
import Register from './containers/Register';

import './styles/index.css';

const Client = Authorization(['client']);

const routes = (
  <Router>
    <App>
      <Switch>
        <Route name='newRecipe' path="/recipes/new" component={ Client(NewRecipe) }/>
        <Route name='recipe' path="/recipes/:id" component={ Recipe }/>
        <Route name='recipes' path="/recipes" component={ Recipes }/>
        <Route name='login' path="/login" component={ Login } />
        <Route name='register' path="/register" component={ Register } />
        {/* Redirects */}
        <Redirect from="/" to="/recipes" />
      </Switch>
    </App> 
  </Router>
);

ReactDOM.render(routes, document.getElementById('root'));
