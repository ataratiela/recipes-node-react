export const loginAction = user => {
  return {
    type: 'LOGIN',
    user
  }
}

export const logoutAction = user => {
  return {
    type: 'LOGOUT'
  }
} 