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
  getLessons
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';

class Grades extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getGrades();
    this.props.getUsers();
    this.props.getLessons();
  }

  handleSelect = selectedGrades => {
    this.setState({ selectedGrades });
  };

  onChangeSearch = e => this.setState({ search: e.target.value });

  render() {
    const {
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

    return (
      <div className={classes.root}>
        <GradesToolbar
          grades={grades}
          selectedGrades={selectedGrades}
          toggleDialog={toggleGradeDialog}
          deleteGrade={() => deleteGrade(selectedGrades[0])}
        />
        <div className={classes.content}>
          {!grades.length ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <GradesTable
              onSelect={selectGrade}
              onSelectAll={selectAllGrades}
              grades={grades}
              selectedGrades={selectedGrades}
            />
          )}
        </div>
        <ResponsiveDialog id="Add-grade" open={openDialog} handleClose={() => toggleGradeDialog()}>
          <AddGrade
            selectedGrade={grades.find(grade => grade._id === selectedGrades[0])}
            addGrade={addGrade}
            lessons={lessons}
            students={students}
            updateGrade={updateGrade}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ userState, gradeState, lessonState }) => ({
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
  deleteGrade
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Grades));
