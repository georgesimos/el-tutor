import { GET_STUDENT_PROFILE, GET_GRADES, GET_LESSONS } from '../types';

import { setAlert } from './alert';

export const getStudentProfile = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/students/only/' + id;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const student = await response.json();
    if (response.ok) {
      dispatch({ type: GET_STUDENT_PROFILE, payload: student });
      dispatch({ type: GET_GRADES, payload: student.grades });
      dispatch({ type: GET_LESSONS, payload: student.lessons });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};
