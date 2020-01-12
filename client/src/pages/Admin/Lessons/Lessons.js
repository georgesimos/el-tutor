import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { LessonsToolbar, LessonsTable, AddLesson } from './components';
import {
  getStudentProfile,
  getUsers,
  getLessons,
  deleteLesson,
  selectLesson,
  selectAllLessons,
  toggleLessonDialog,
  addLesson,
  updateLesson
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';
import { match } from '../../../utils';

class Lessons extends Component {
  state = { search: '' };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { user } = this.props;
    const isAdmin = user && user.role === 'admin';
    const isTeacher = user && user.role === 'teacher';
    const isStudent = user && user.role === 'student';
    if (isAdmin) {
      this.props.getLessons();
      this.props.getUsers();
    }
    if (isStudent) {
      this.props.getStudentProfile(user._student);
    }
    if (isTeacher) console.log('teacher');
  }

  handleSelect = selectedLessons => {
    this.setState({ selectedLessons });
  };

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const { search } = this.state;
    const {
      user,
      classes,
      lessons,
      students,
      teachers,
      selectedLessons,
      openDialog,
      toggleLessonDialog,
      addLesson,
      selectLesson,
      selectAllLessons,
      updateLesson,
      deleteLesson
    } = this.props;

    const isAdmin = user && user.role === 'admin';
    const isTeacher = user && user.role === 'teacher';
    const filteredLessons = match(search, lessons, 'title');

    return (
      <div className={classes.root}>
        {isAdmin ||
          (isTeacher && (
            <LessonsToolbar
              lessons={filteredLessons}
              search={search}
              onChangeSearch={this.onChangeSearch}
              selectedLessons={selectedLessons}
              toggleDialog={toggleLessonDialog}
              deleteLesson={() => deleteLesson(selectedLessons[0])}
            />
          ))}
        <div className={classes.content}>
          {!filteredLessons.length ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <LessonsTable
              isAdmin={isAdmin}
              onSelect={selectLesson}
              onSelectAll={selectAllLessons}
              lessons={filteredLessons}
              selectedLessons={selectedLessons}
            />
          )}
        </div>
        <ResponsiveDialog
          id="Add-lesson"
          open={openDialog}
          handleClose={() => toggleLessonDialog()}
        >
          <AddLesson
            selectedLesson={lessons.find(lesson => lesson._id === selectedLessons[0])}
            addLesson={addLesson}
            teachers={teachers}
            students={students}
            updateLesson={updateLesson}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ authState, userState, lessonState }) => ({
  user: authState.user,
  teachers: userState.users.filter(user => user.role === 'teacher'),
  students: userState.users.filter(user => user.role === 'student'),
  lessons: lessonState.lessons,
  selectedLessons: lessonState.selectedLessons,
  openDialog: lessonState.openDialog
});
const mapDispatchToProps = {
  getStudentProfile,
  getUsers,
  getLessons,
  selectLesson,
  selectAllLessons,
  toggleLessonDialog,
  addLesson,
  updateLesson,
  deleteLesson
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Lessons));
