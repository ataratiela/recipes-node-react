import createStore from './store';

const login = (state = { id: null, name: null, rol: null, token: null }, action) => {
  switch(action.type) {
    case 'LOGIN':
      return action.user;
    case 'LOGOUT':
      return { id: null, name: null, rol: null, token: null };
    default:
      return state;
  }
};

const store = createStore(login);

export default store;