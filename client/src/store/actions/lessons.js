import {
  GET_LESSONS,
  ADD_LESSON,
  UPDATE_LESSON,
  DELETE_LESSON,
  TOGGLE_LESSON_DIALOG,
  SELECT_LESSON,
  SELECT_ALL_LESSONS
} from '../types';

import { setAlert } from './alert';

export const toggleLessonDialog = () => ({ type: TOGGLE_LESSON_DIALOG });

export const selectLesson = lesson => ({
  type: SELECT_LESSON,
  payload: lesson
});

export const selectAllLessons = () => ({ type: SELECT_ALL_LESSONS });

export const getLessons = () => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/lessons';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const lessons = await response.json();
    if (response.ok) {
      dispatch({ type: GET_LESSONS, payload: lessons });
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
  }
};

export const addLesson = lesson => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/lessons/';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lesson)
    });
    const data = await response.json();
    const newLesson = data.lesson;
    if (response.ok) {
      dispatch(setAlert('Lesson Created', 'success', 5000));
      dispatch({ type: ADD_LESSON, payload: newLesson });
      return { status: 'success', message: 'Lesson Created' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Lesson have not been saved, try again.'
    };
  }
};

export const updateLesson = (lesson, id) => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/lessons/' + id;
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(lesson)
    });
    const data = await response.json();
    const newLesson = data.lesson;
    if (response.ok) {
      dispatch(setAlert('Lesson Updated', 'success', 5000));
      dispatch({ type: UPDATE_LESSON, payload: newLesson });
      return { status: 'success', message: 'Lesson Updated' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Lesson have not been saved, try again.'
    };
  }
};

export const deleteLesson = id => async dispatch => {
  try {
    const token = localStorage.getItem('jwtToken');
    const url = '/api/lessons/' + id;
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.ok) {
      dispatch(setAlert('Lesson Deleted', 'success', 5000));
      dispatch({ type: DELETE_LESSON, payload: id });
      return { status: 'success', message: 'Lesson Removed' };
    } else {
      throw new Error(data._message);
    }
  } catch (error) {
    dispatch(setAlert(error.message, 'error', 5000));
    return {
      status: 'error',
      message: ' Lesson have not been deleted, try again.'
    };
  }
};
