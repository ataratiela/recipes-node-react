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

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.userStoreDidChange = this.userStoreDidChange.bind(this);
  }

  componentDidMount() {
    userStore.subscribe(this.userStoreDidChange);
    this.userStoreDidChange();
  }

  userStoreDidChange() {
    const user = userStore.getState();

    this.setState({ user });
  }

  handleLogin(event) {
    /* TODO: Aqui hay que hacer el login con AJAX (metodo POST) */
    userStore.dispatch({ type: 'LOGIN', user: { id: 'sergiga', name: 'Sergio García Villanueva' } });
  }

  handleLogout(event) {
    /* TODO: Aqui hay que hacer el logout con AJAX (metodo DELETE) */
    userStore.dispatch({ type: 'LOGOUT' });
  }

  render() {
    return (
      <div>
        <Navbar user={ this.state.user.name } onLogin={ this.handleLogin } onLogout={ this.handleLogout } />

        { this.props.children }
      </div>
    );
  }
}

export default App;