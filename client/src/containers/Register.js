import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: '',
      name: '',
      pass: '',
      userCreated: false
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onFormChange = this.onFormChange.bind(this);
  }

  onFormChange(event) {
    const target = event.target;
    this.setState({
      [target.name]: target.value
    })
  }

  onFormSubmit(event) {
    event.preventDefault();
    axios.post('/register', { user: this.state.user, name: this.state.name, pass: this.state.pass })
      .then(({ status }) => {
        const created = status === 200;
        this.setState({ userCreated: created });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { user, name, pass } = this.state;

    return (
      this.state.userCreated
        ? <Redirect to={'/login'} />
        : <div className='container-login'>
            <div className='login-card login-error'>
              <div className='error-container'>
              </div>
            </div>
            <div className='login-card'>
              <div className='login-header center-flex'>
                Register
              </div>
              <div className='login-content'>
                <form className='login-form' onSubmit={this.onFormSubmit}>
                  <div className='input-row'>
                    <input type="text" name="user" value={user} 
                      placeholder='Username' onChange={this.onFormChange} />
                  </div>
                  <div className='input-row'>
                    <input type="text" name="user" value={name} 
                      placeholder='First Name' onChange={this.onFormChange} />
                  </div>
                  <div className='input-row'>
                    <input type="password" name="pass" value={pass} 
                      placeholder='Password' onChange={this.onFormChange} />
                  </div>
                  <div className='input-row'>
                    <input type="submit" value='Register' className='btn btn-fill btn-submit' />
                  </div>
                </form>
              </div>
            </div>
          </div>
    );
  }
}

export default Register;
