import {combineReducers} from 'redux';

import auth from './auth';
import userData from './userData';

export default combineReducers({
  auth,
  userData,
});
