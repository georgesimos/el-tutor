import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { SearchInput } from '../../../../../components';
import styles from './styles';

const LessonsToolbar = props => {
  const {
    classes,
    className,
    toggleDialog,
    selectedLessons,
    deleteLesson,
    search,
    onChangeSearch
  } = props;
  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <div className={classes.row}>
        <SearchInput
          className={classes.searchInput}
          placeholder="Search by email"
          value={search}
          onChange={onChangeSearch}
        />

        <div>
          {selectedLessons.length > 0 && (
            <IconButton className={classes.deleteButton} onClick={deleteLesson}>
              <DeleteIcon />
            </IconButton>
          )}
          <Button onClick={toggleDialog} color="primary" size="small" variant="outlined">
            {selectedLessons.length === 1 ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

LessonsToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedLessons: PropTypes.array
};

LessonsToolbar.defaultProps = {
  selectedLessons: []
};
export default withStyles(styles)(LessonsToolbar);
