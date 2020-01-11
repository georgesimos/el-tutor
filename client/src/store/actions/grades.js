import {
  GET_GRADES,
  UPDATE_GRADE,
  DELETE_GRADE,
  TOGGLE_GRADE_DIALOG,
  SELECT_GRADE,
  SELECT_ALL_GRADES
} from '../types';

import { setAlert } from './alert';

export const toggleGradeDialog = () => ({ type: TOGGLE_GRADE_DIALOG });

export const selectGrade = grade => ({
  type: SELECT_GRADE,
  payload: grade
});

export const selectAllGrades = () => ({ type: SELECT_ALL_GRADES });

export const getGrades = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/grades';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const grades = await response.json();
    if (response.ok) {
      dispatch({ type: GET_GRADES, payload: grades });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addGrade = grade => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/grades/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(grade)
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setAlert('Grade Created', 'success', 5000));
      dispatch(getGrades());
      return { status: 'success', message: 'Grade Created' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Grade have not been saved, try again.'
    };
  }
};

export const updateGrade = (grade, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/grades/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(grade)
    });
    const data = await response.json();
    const newGrade = data.grade;
    if (response.ok) {
      dispatch(setAlert('Grade Updated', 'success', 5000));
      dispatch({ type: UPDATE_GRADE, payload: newGrade });
      return { status: 'success', message: 'Grade Updated' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Grade have not been saved, try again.'
    };
  }
};

export const deleteGrade = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/grades/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setAlert('Grade Deleted', 'success', 5000));
      dispatch({ type: DELETE_GRADE, payload: id });
      return { status: 'success', message: 'Grade Removed' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Grade have not been deleted, try again.'
    };
  }
};
