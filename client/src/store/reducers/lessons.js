import {
  GET_LESSONS,
  ADD_LESSON,
  UPDATE_LESSON,
  DELETE_LESSON,
  TOGGLE_LESSON_DIALOG,
  SELECT_LESSON,
  SELECT_ALL_LESSONS
} from '../types';

const initialState = {
  lessons: [],
  selectedLessons: [],
  openDialog: false
};

const toggleLessonDialog = state => ({
  ...state,
  openDialog: !state.openDialog
});

const selectLesson = (state, payload) => {
  const { selectedLessons } = state;

  const selectedIndex = selectedLessons.indexOf(payload);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedLessons, payload);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedLessons.slice(1));
  } else if (selectedIndex === selectedLessons.length - 1) {
    newSelected = newSelected.concat(selectedLessons.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedLessons.slice(0, selectedIndex),
      selectedLessons.slice(selectedIndex + 1)
    );
  }

  return {
    ...state,
    selectedLessons: newSelected
  };
};

const selectAllLessons = state => ({
  ...state,
  selectedLessons: !state.selectedLessons.length ? state.lessons.map(lesson => lesson._id) : []
});

const getLessons = (state, payload) => ({
  ...state,
  lessons: payload
});

const addLesson = (state, payload) => ({
  ...state,
  lessons: [...state.lessons, payload]
});

const updateLesson = (state, payload) => ({
  ...state,
  lessons: [...state.lessons.filter(lesson => lesson._id !== payload._id), payload]
});

const deleteLesson = (state, payload) => ({
  ...state,
  lessons: state.lessons.filter(lesson => lesson._id !== payload),
  selectedLessons: state.selectedLessons.filter(element => element !== payload)
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LESSONS:
      return getLessons(state, payload);
    case TOGGLE_LESSON_DIALOG:
      return toggleLessonDialog(state);
    case SELECT_LESSON:
      return selectLesson(state, payload);
    case SELECT_ALL_LESSONS:
      return selectAllLessons(state);
    case ADD_LESSON:
      return addLesson(state, payload);
    case UPDATE_LESSON:
      return updateLesson(state, payload);
    case DELETE_LESSON:
      return deleteLesson(state, payload);
    default:
      return state;
  }
};
