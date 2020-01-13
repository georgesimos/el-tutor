import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { GradesToolbar, GradesTable, AddGrade } from './components';
import {
  getUsers,
  getGrades,
  deleteGrade,
  selectGrade,
  selectAllGrades,
  toggleGradeDialog,
  addGrade,
  updateGrade,
  getLessons,
  getStudentProfile,
  getTeacherProfile
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';

class Grades extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const {
      user,
      getUsers,
      getLessons,
      getGrades,
      getStudentProfile,
      getTeacherProfile
    } = this.props;
    const isAdmin = user && user.role === 'admin';
    const isTeacher = user && user.role === 'teacher';
    const isStudent = user && user.role === 'student';

    if (isStudent) getStudentProfile();
    if (isTeacher) getTeacherProfile();

    if (isAdmin) {
      getLessons();
      getGrades();
      getUsers();
    }
  }

  handleSelect = selectedGrades => {
    this.setState({ selectedGrades });
  };

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const {
      user,
      classes,
      grades,
      students,
      lessons,
      selectedGrades,
      openDialog,
      toggleGradeDialog,
      addGrade,
      selectGrade,
      selectAllGrades,
      updateGrade,
      deleteGrade
    } = this.props;

    const isAdmin = user && user.role === 'admin';
    const isTeacher = user && user.role === 'teacher';
    const isStudent = user && user.role === 'student';

    return (
      <div className={classes.root}>
        {!isStudent && (
          <GradesToolbar
            grades={grades}
            selectedGrades={selectedGrades}
            toggleDialog={toggleGradeDialog}
            deleteGrade={() => deleteGrade(selectedGrades[0])}
          />
        )}
        <div className={classes.content}>
          {!grades.length ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <GradesTable
              isAdmin={isAdmin}
              onSelect={selectGrade}
              onSelectAll={selectAllGrades}
              grades={grades}
              selectedGrades={selectedGrades}
            />
          )}
        </div>
        {!isStudent && (
          <ResponsiveDialog
            id="Add-grade"
            open={openDialog}
            handleClose={() => toggleGradeDialog()}
          >
            <AddGrade
              selectedGrade={grades.find(grade => grade._id === selectedGrades[0])}
              addGrade={addGrade}
              lessons={lessons}
              students={students}
              updateGrade={updateGrade}
            />
          </ResponsiveDialog>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authState, userState, gradeState, lessonState }) => ({
  user: authState.user,
  lessons: lessonState.lessons,
  students: userState.users.filter(user => user.role === 'student'),
  grades: gradeState.grades,
  selectedGrades: gradeState.selectedGrades,
  openDialog: gradeState.openDialog
});
const mapDispatchToProps = {
  getUsers,
  getGrades,
  getLessons,
  selectGrade,
  selectAllGrades,
  toggleGradeDialog,
  addGrade,
  updateGrade,
  deleteGrade,
  getStudentProfile,
  getTeacherProfile
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Grades));
