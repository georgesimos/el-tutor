import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import styles from './styles';

const GradesToolbar = props => {
  const { classes, className, toggleDialog, selectedGrades, deleteGrade } = props;
  const rootClassName = classNames(classes.root, className);

  return (
    <div className={rootClassName}>
      <div className={classes.row}>
        <div>
          {selectedGrades.length > 0 && (
            <IconButton className={classes.deleteButton} onClick={deleteGrade}>
              <DeleteIcon />
            </IconButton>
          )}
          <Button onClick={toggleDialog} color="primary" size="small" variant="outlined">
            {selectedGrades.length === 1 ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

GradesToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedGrades: PropTypes.array
};

GradesToolbar.defaultProps = {
  selectedGrades: []
};
export default withStyles(styles)(GradesToolbar);
