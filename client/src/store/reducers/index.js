import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';

export default combineReducers({
  alertState: alert,
  authState: auth,
  userState: users,
});
