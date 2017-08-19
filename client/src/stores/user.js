import createStore from './store';

const login = (state = { id: null, name: null }, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return { id: null, name: null };
    default:
      return { id: null, name: null };
  }
};

const store = createStore(login);

export default store;