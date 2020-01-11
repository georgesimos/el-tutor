import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import users from './users';
import lessons from './lessons';
import grades from './grades';
import profile from './profile';

export default combineReducers({
  alertState: alert,
  authState: auth,
  userState: users,
  lessonState: lessons,
  gradeState: grades,
  profileState: profile
});
