import React, { Component } from 'react';
import {
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';

import { loginAction } from '../actions/login';

import userStore from '../stores/user';
import Error from '../views/Error';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      userID: null,
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
    
    axios.post('/api/auth', { userID: this.state.user, pass: this.state.pass },
      {
        validateStatus: function (status) {
          return status >= 200 && status < 500;
        }
      })
      .then(({ data, status }) => {
        if(status >= 200 && status < 300){
          const { user, token } = data;

          userStore.dispatch(loginAction({ 
            id: user.userID, 
            name: user.name,
            rol: user.rol, 
            token 
          }));
        }else if (status >= 400 && status < 499){
          this.setState({ errors: data })
        }else{
          throw new Error('Unexpected status code');
        }
      })
      .catch((error) => {
        this.setState({ user: '', pass: '' });
      });
  }

  render() {
    const { user, pass, userID, errors } = this.state;
    const error = errors.length > 0
      ? <Error name='Login error:' errors={errors} />
      : null;

    return (
      userID !== null
        ? <Redirect to={'/recipes'} />
        : <div>
          {error}
          <form className='content full-width' onSubmit={this.onFormSubmit}>
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
        </div>
    );
  }
}

export default Login;
