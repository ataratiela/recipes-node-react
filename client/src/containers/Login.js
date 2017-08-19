import React, { Component } from 'react';
import {
  Redirect,
  Link
} from 'react-router-dom';
import axios from 'axios';

import '../styles/Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: '',
      pass: '',
      loggedUserId: ''
    }

    this.onFormChange = this.onFormChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
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
        console.log(data);
        this.setState({ loggedUserId: data.id });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      this.state.loggedUserId !== ''
        ? <Redirect to={'/recipes'} />
        : <form className='form' onSubmit={this.onFormSubmit}>
          <label>
            User:
            <input type="text" name="user" onChange={this.onFormChange} />
          </label>
          <label>
            Password:
            <input type="password" name="pass" onChange={this.onFormChange} />
          </label>
          <input type="submit" />
          {/*<Link to={'/user/new'}>Register now</Link>*/}
        </form>
    );
  }
}

export default Login;
