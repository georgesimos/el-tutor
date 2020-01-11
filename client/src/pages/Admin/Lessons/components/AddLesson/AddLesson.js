import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  withStyles,
  Typography,
  FormControl,
  InputLabel,
  Select,
  Input,
  FormHelperText
} from '@material-ui/core';
import { Button, TextField, MenuItem } from '@material-ui/core';
import styles from './styles';

class AddLesson extends Component {
  state = {
    title: '',
    description: '',
    _teacher: '',
    _students: []
  };

  componentDidMount() {
    if (this.props.selectedLesson) {
      const { title, description, _teacher, _students } = this.props.selectedLesson;
      this.setState({
        title,
        description,
        _teacher,
        _students
      });
    }
  }

  handleChange = e => {
    this.setState({
      state: e.target.value
    });
  };

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onAddLesson = () => {
    const lesson = { ...this.state };
    this.props.addLesson(lesson);
  };

  onUpdateLesson = () => {
    const lesson = { ...this.state };
    this.props.updateLesson(lesson, this.props.selectedLesson._id);
  };

  render() {
    const { classes, className, selectedLesson, teachers, students } = this.props;
    const { title, description, _teacher, _students } = this.state;

    const rootClassName = classNames(classes.root, className);
    const mainTitle = selectedLesson ? 'Edit Lesson' : 'Add Lesson';
    const submitButton = selectedLesson ? 'Update Lesson' : 'Add Lesson';
    const submitAction = selectedLesson ? () => this.onUpdateLesson() : () => this.onAddLesson();

    const teachersOptions = teachers.length
      ? teachers
          .filter(t => t._teacher)
          .map(({ email, _teacher }) => ({ text: email, value: _teacher }))
      : [];
    const studentsOptions = students.length
      ? students
          .filter(s => s._student)
          .map(({ email, _student }) => ({ text: email, value: _student }))
      : [];

    return (
      <div className={rootClassName}>
        <Typography variant="h4" className={classes.title}>
          {mainTitle}
        </Typography>
        <form autoComplete="off" noValidate>
          <div className={classes.field}>
            <TextField
              fullWidth
              className={classes.textField}
              helperText="Please specify the Title"
              label="Title"
              margin="dense"
              required
              value={title}
              variant="outlined"
              onChange={event => this.handleFieldChange('title', event.target.value)}
            />
            <TextField
              fullWidth
              className={classes.textField}
              label="Description"
              margin="dense"
              required
              value={description}
              variant="outlined"
              onChange={event => this.handleFieldChange('description', event.target.value)}
            />
          </div>
          <div className={classes.field}>
            <FormControl variant="outlined" fullWidth className={classes.textField}>
              <InputLabel id="teacher-label">Teacher</InputLabel>
              <Select
                labelId="teacher-label"
                id="teacher"
                value={_teacher}
                onChange={event => this.handleFieldChange('_teacher', event.target.value)}
              >
                {teachersOptions.map(({ text, value }) => (
                  <MenuItem key={`student-${value}`} value={value}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select Teacher Email</FormHelperText>
            </FormControl>

            <FormControl variant="outlined" fullWidth className={classes.textField}>
              <InputLabel id="mutiple-students-label">Select Students Email</InputLabel>
              <Select
                labelId="mutiple-students-label"
                id="mutiple-students"
                multiple
                value={_students}
                onChange={event => this.handleFieldChange('_students', event.target.value)}
              >
                {studentsOptions.map(({ text, value }) => (
                  <MenuItem key={`student-${value}`} value={value}>
                    {text}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </form>

        <Button
          className={classes.buttonFooter}
          color="primary"
          variant="contained"
          onClick={submitAction}
        >
          {submitButton}
        </Button>
      </div>
    );
  }
}

AddLesson.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(AddLesson));
