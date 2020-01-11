import { GET_STUDENT_PROFILE } from '../types';

const initialState = {
  student: null
};

const getStudentProfile = (state, payload) => ({
  ...state,
  student: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STUDENT_PROFILE:
      return getStudentProfile(state, payload);
    default:
      return state;
  }
};
