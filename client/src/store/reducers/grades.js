import {
  GET_GRADES,
  ADD_GRADE,
  UPDATE_GRADE,
  DELETE_GRADE,
  TOGGLE_GRADE_DIALOG,
  SELECT_GRADE,
  SELECT_ALL_GRADES
} from '../types';

const initialState = {
  grades: [],
  selectedGrades: [],
  openDialog: false
};

const toggleGradeDialog = state => ({
  ...state,
  openDialog: !state.openDialog
});

const selectGrade = (state, payload) => {
  const { selectedGrades } = state;

  const selectedIndex = selectedGrades.indexOf(payload);
  let newSelected = [];

  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selectedGrades, payload);
  } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selectedGrades.slice(1));
  } else if (selectedIndex === selectedGrades.length - 1) {
    newSelected = newSelected.concat(selectedGrades.slice(0, -1));
  } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
      selectedGrades.slice(0, selectedIndex),
      selectedGrades.slice(selectedIndex + 1)
    );
  }

  return {
    ...state,
    selectedGrades: newSelected
  };
};

const selectAllGrades = state => ({
  ...state,
  selectedGrades: !state.selectedGrades.length ? state.grades.map(grade => grade._id) : []
});

const getGrades = (state, payload) => ({
  ...state,
  grades: payload
});

const addGrade = (state, payload) => ({
  ...state,
  grades: [...state.grades, payload]
});

const updateGrade = (state, payload) => ({
  ...state,
  grades: [...state.grades.filter(grade => grade._id !== payload._id), payload]
});

const deleteGrade = (state, payload) => ({
  ...state,
  grades: state.grades.filter(grade => grade._id !== payload),
  selectedGrades: state.selectedGrades.filter(element => element !== payload)
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_GRADES:
      return getGrades(state, payload);
    case TOGGLE_GRADE_DIALOG:
      return toggleGradeDialog(state);
    case SELECT_GRADE:
      return selectGrade(state, payload);
    case SELECT_ALL_GRADES:
      return selectAllGrades(state);
    case ADD_GRADE:
      return addGrade(state, payload);
    case UPDATE_GRADE:
      return updateGrade(state, payload);
    case DELETE_GRADE:
      return deleteGrade(state, payload);
    default:
      return state;
  }
};
