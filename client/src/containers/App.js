import React, { Component } from 'react';
import Recipes from './Recipes';

class App extends Component {
  render() {
    return (
      <div className='wrapper full-height'>
        <Recipes />
      </div>
    );
  }
}

export default App;