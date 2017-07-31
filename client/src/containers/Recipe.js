import React, { Component } from 'react';

import '../styles/Recipes.css';

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: []
    }
  }

  render() {
    const { id } = this.props.match.params;

    return (
      <div>Recipe number { id }</div>
    );
  }
}

export default Recipes;