import { GET_STUDENT_PROFILE, GET_TEACHER_PROFILE } from '../types';

const initialState = {
  student: null,
  teacher: null
};

const getStudentProfile = (state, payload) => ({
  ...state,
  student: payload
});

const getTeacherProfile = (state, payload) => ({
  ...state,
  teacher: payload
});

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_STUDENT_PROFILE:
      return getStudentProfile(state, payload);
    case GET_TEACHER_PROFILE:
      return getTeacherProfile(state, payload);
    default:
      return state;
  }
};
