import React, { Component } from 'react';
import {
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';
import userStore from '../stores/user';
import Error from '../views/Error';

import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      loggedUserId: null,
      errors: []
    }

    this.userStoreDidChange = this.userStoreDidChange.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentWillMount() {
    userStore.subscribe(this.userStoreDidChange);
    this.userStoreDidChange();
  }

  componentWillUnmount() {
    userStore.unsubscribe(this.userStoreDidChange);
  }

  userStoreDidChange() {
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
    axios.post('/login', { user: this.state.user, pass: this.state.pass },
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }
      })
      .then(({ data, status }) => {
        console.log(data);
        if(status >= 200 && status < 300){
          userStore.dispatch({ type: 'LOGIN', user: { id: data.userID, name: data.name } });
        }else if (status >= 400 && status < 499){
          this.setState({ errors: data })
        }else{
          throw 'Unexpected status code';
        }
      })
      .catch((error) => {
        console.log('no ok');
        console.log(error);
        this.setState({ user: '', pass: '' });
      });
  }

  render() {
    const error = this.state.errors.length > 0
      ? <Error name='Login error:' errors={this.state.errors} />
      : null;

    return (
      this.state.loggedUserId !== null
        ? <Redirect to={'/recipes'} />
        : <div>
          {error}
          <form className='content full-width' onSubmit={this.onFormSubmit}>
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
        </div>
    );
  }
}

export default Login;
