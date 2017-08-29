import React, { Component } from 'react';
import {
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';

import { loginAction } from '../actions/login';

import userStore from '../stores/user';

import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      userID: null
    }

    this.userStoreDidChange = this.userStoreDidChange.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount(){
    userStore.subscribe(this.userStoreDidChange);
    this.userStoreDidChange();
  }

  componentWillUnmount(){
    userStore.unsubscribe(this.userStoreDidChange);
  }

  userStoreDidChange(){
    const { id } = userStore.getState();
    this.setState({ userID: id });
  }

  onFormChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    });
  }

  onFormSubmit(event) {
    event.preventDefault();
    axios.post('/api/auth', { userID: this.state.user, pass: this.state.pass })
      .then(({ data }) => {
        const { user, token } = data;

        userStore.dispatch(loginAction({ 
          id: user.userID, 
          name: user.name,
          rol: user.rol, 
          token 
        }));
      })
      .catch((error) => {
        this.setState({ user: '', pass: '' });
      });
  }

  render() {
    const { user, pass, userID } = this.state;

    return (
      userID !== null
        ? <Redirect to={'/recipes'} />
        : <form className='content full-width' onSubmit={this.onFormSubmit}>
          <label>
            User:
            <input type="text" name="user" value={user} onChange={this.onFormChange} />
          </label>
          <label>
            Password:
            <input type="password" name="pass" value={pass} onChange={this.onFormChange} />
          </label>
          <input type="submit" />
          <Link to={'/register'}>Register now</Link>
        </form>
    );
  }
}

export default Login;
