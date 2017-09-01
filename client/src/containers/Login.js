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
        : <div className='container-login center-flex'>
            <div className='login-card'>
              <div className='login-error'>
                {error}
              </div>
              <div className='login-header center-flex'>
                Login
              </div>
              <div className='login-content'>
                <form className='login-form' onSubmit={this.onFormSubmit}>
                  <div className='input-row'>
                    <input type="text" name="user" value={user} 
                      placeholder='Username' onChange={this.onFormChange} />
                  </div>
                  <div className='input-row'>
                    <input type="password" name="pass" value={pass} 
                      placeholder='Password' onChange={this.onFormChange} />
                  </div>
                  <div className='input-row'>
                    <input type="submit" value='Login' className='btn btn-fill btn-submit' />
                  </div>
                </form>
              </div>
              <Link className='register-now' to={'/register'}>Register now</Link>
            </div>
          </div>
    );
  }
}

export default Login;
