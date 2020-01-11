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
import { textTruncate } from '../../../../../utils';

class LessonsTable extends Component {
  state = {
    selectedLessons: [],
    rowsPerPage: 10,
    page: 0
  };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired,
    onSelect: PropTypes.func,
    lessons: PropTypes.array.isRequired
  };

  static defaultProps = {
    lessons: [],
    onSelect: () => {}
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  getLessonTeacher = ({ _teacher }) => {
    if (_teacher) {
      const { _user } = _teacher;
      if (_user) {
        const { name, email } = _user;
        return [name, email];
      }
    }
    return ['', ''];
  };

  render() {
    const { classes, className, lessons, selectedLessons, onSelect, onSelectAll } = this.props;
    const { rowsPerPage, page } = this.state;
    const rootClassName = classNames(classes.root, className);
    return (
      <Portlet className={rootClassName}>
        <PortletContent noPadding>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="left">
                  <Checkbox
                    checked={selectedLessons.length === lessons.length}
                    color="primary"
                    indeterminate={
                      selectedLessons.length > 0 && selectedLessons.length < lessons.length
                    }
                    onChange={onSelectAll}
                  />
                  Title
                </TableCell>
                <TableCell align="left">Description</TableCell>
                <TableCell align="left">Teacher Name</TableCell>
                <TableCell align="left">Teacher Email</TableCell>
                <TableCell align="left">Registration date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {lessons &&
                lessons
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(lesson => (
                    <TableRow
                      className={classes.tableRow}
                      hover
                      key={lesson._id}
                      selected={selectedLessons.indexOf(lesson._id) !== -1}
                    >
                      <TableCell className={classes.tableCell}>
                        <div className={classes.tableCellInner}>
                          <Checkbox
                            checked={selectedLessons.indexOf(lesson._id) !== -1}
                            color="primary"
                            onChange={() => onSelect(lesson._id)}
                            value="true"
                          />
                          <Typography className={classes.nameText} variant="body1">
                            {lesson.title}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {textTruncate(lesson.description, 100)}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getLessonTeacher(lesson)[0]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {this.getLessonTeacher(lesson)[1]}
                      </TableCell>
                      <TableCell className={classes.tableCell}>
                        {moment(lesson.createdAt).format('DD/MM/YYYY')}
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
            count={lessons.length}
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

export default withStyles(styles)(LessonsTable);
