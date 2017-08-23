import React, { Component } from 'react';
import {
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';
import userStore from '../stores/user';

import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      loggedUserId: null
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
    this.setState({ loggedUserId: id });
  }

  onFormChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault();
    axios.post('/login', { user: this.state.user, pass: this.state.pass })
      .then(({ data }) => {
        userStore.dispatch({ type: 'LOGIN', user:{id:data.userID, name:data.name}});
      })
      .catch((error) => {
        this.setState({ user: '', pass: '' });
      });
  }

  render() {
    return (
      this.state.loggedUserId !== null
        ? <Redirect to={'/recipes'} />
        : <form className='content full-width' onSubmit={this.onFormSubmit}>
          <label>
            User:
            <input type="text" name="user" value={this.state.user} onChange={this.onFormChange} />
          </label>
          <label>
            Password:
            <input type="password" name="pass" value={this.state.pass} onChange={this.onFormChange} />
          </label>
          <input type="submit" />
          <Link to={'/register'}>Register now</Link>
        </form>
    );
  }
}

export default Login;
