import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'; 

import userStore from '../stores/user';

const Authorization = (allowedRoles) => 
  (WrappedComponent) => {
    return class WithAuthorization extends Component {
      constructor(props) {
        super(props);

        this.state = {
          user: null
        }

        this.userStoreDidChange = this.userStoreDidChange.bind(this);
      }

      componentWillMount() {
        userStore.subscribe(this.userStoreDidChange);
        this.userStoreDidChange();
      }

      componentWillUnmount() {
        userStore.unsubscribe(this.userStoreDidChange);
      }

      userStoreDidChange() {
        const user = userStore.getState();

        this.setState({ user });
      }

      render() {
        const { user } = this.state;
        
        if(user.id) {
          return <WrappedComponent { ...this.props } />
        }
        else {
          return <Redirect to='/' />;
        }
      }
    }
  };

  export default Authorization;