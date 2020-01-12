import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import {
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  TablePagination
} from '@material-ui/core';

import { Portlet, PortletContent } from '../../../../../components';
import styles from './styles';

class GradeTable extends Component {
  state = {
    selectedGrades: [],
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    grades: PropTypes.array.isRequired
  };

  static defaultProps = {
    grades: [],
    onSelect: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getGradeStudent = ({ _student }) => {
    if (_student) {
      const { _user } = _student;
      if (_user) {
        const { name, email } = _user;
        return [name, email];
      }
    }
    return ['', ''];
  };
  getGradeLesson = ({ _lesson }) => {
    if (_lesson) {
      const { title, _teacher } = _lesson;
      if (_teacher) {
        const { _user } = _teacher;
        if (_user) {
          const { name, email } = _user;
          return [title, name, email];
        }
      }
    }
    return ['', '', ''];
  };

  render() {
    const {
      classes,
      className,
      isAdmin,
      grades,
      selectedGrades,
      onSelect,
      onSelectAll
    } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  {isAdmin && (
                    <Checkbox
                      checked={selectedGrades.length === grades.length}
                      color="primary"
                      indeterminate={
                        selectedGrades.length > 0 && selectedGrades.length < grades.length
                      }
                      onChange={onSelectAll}
                    />
                  )}
                  Grade
                </TableCell>
                <TableCell align="left">Lesson Title</TableCell>
                <TableCell align="left">Lesson Teacher</TableCell>
                <TableCell align="left">Student Name</TableCell>
                <TableCell align="left">Student Email</TableCell>
                <TableCell align="left">Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {grades &&
                grades
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(grade => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={grade._id}
                      selected={selectedGrades.indexOf(grade._id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          {isAdmin && (
                            <Checkbox
                              checked={selectedGrades.indexOf(grade._id) !== -1}
                              color="primary"
                              onChange={() => onSelect(grade._id)}
                              value="true"
                            />
                          )}
                          <Typography className={classes.nameText} variant="body1">
                            {grade.grade}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getGradeLesson(grade)[0]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getGradeLesson(grade)[1]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getGradeStudent(grade)[0]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getGradeStudent(grade)[1]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(grade.createdAt).format('DD/MM/YYYY')}
                      </TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
          <TablePagination
            backIconButtonProps={{
              'aria-label': 'Previous Page'
            }}
            component="div"
            count={grades.length}
            nextIconButtonProps={{
              'aria-label': 'Next Page'
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            page={page}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </PortletContent>
      </Portlet>
    );
  }
}

export default withStyles(styles)(GradeTable);
