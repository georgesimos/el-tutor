import {
  GET_STUDENT_PROFILE,
  GET_TEACHER_PROFILE,
  GET_GRADES,
  GET_LESSONS,
  GET_USERS
} from '../types';

import { setAlert } from './alert';

export const getStudentProfile = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/students/me/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const student = await response.json();
    if (response.ok) {
      dispatch({ type: GET_STUDENT_PROFILE, payload: student });
      dispatch({ type: GET_GRADES, payload: student._grades });
      dispatch({ type: GET_LESSONS, payload: student._lessons });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const getTeacherProfile = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/teachers/me/';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const teacher = await response.json();
    if (response.ok) {
      const users = teacher._lesson._students.map(student => student._user);
      dispatch({ type: GET_TEACHER_PROFILE, payload: teacher });
      dispatch({ type: GET_GRADES, payload: teacher._grades });
      dispatch({ type: GET_LESSONS, payload: [teacher._lesson] });
      dispatch({ type: GET_USERS, payload: users });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
