import React, { Component } from 'react';
import Navbar from '../views/Navbar';

import userStore from '../stores/user';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        id: '',
        name: ''
      }
    }

    this.handleLogout = this.handleLogout.bind(this);
    this.userStoreDidChange = this.userStoreDidChange.bind(this);
  }

  componentWillMount() {
    userStore.subscribe(this.userStoreDidChange);
    this.userStoreDidChange();
  }

  userStoreDidChange() {
    const user = userStore.getState();

    this.setState({ user });
  }

  handleLogout(event) {
    userStore.dispatch({ type: 'LOGOUT' });
  }

  render() {
    return (
      <div>
        <Navbar 
          user={ this.state.user.name } 
          handleLogout={ this.handleLogout }/>

        <div className='main-content'>
          { this.props.children }
        </div>
      </div>
    );
  }
}

export default App;