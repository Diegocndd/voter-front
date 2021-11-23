
export const Types = {
  LOGIN: 'auth/LOGIN',
  LOGOUT: 'auth/LOGOUT',
};
    
const initialState = {
  isLogged: false,
  token: null,
};
  
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.LOGIN:
      return {isLogged: true, token: action.payload.token};
    case Types.LOGOUT:
      return {isLogged: false, token: null};
    default:
      return state;
  }
}
    
export function loginUser(token) {
  return {
    type: Types.LOGIN,
    payload: {
      token
    },
  }
}
  
export function logoutUser() {
  return {
    type: Types.LOGOUT,
  }
}