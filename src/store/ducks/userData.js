
export const Types = {
  SET_DATA: 'SET_DATA',
  CLEAR_DATA: 'CLEAR_DATA',
};
    
const initialState = {
  data: {},
};
  
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.SET_DATA:
      return {data: action.payload.data};
    case Types.CLEAR_DATA:
      return {data: {}};
    default:
      return state;
  }
}
    
export function setUserData(data) {
  return {
    type: Types.SET_DATA,
    payload: {
      data
    },
  }
}

export function clearUserData() {
  return {
    type: Types.CLEAR_DATA,
  }
}