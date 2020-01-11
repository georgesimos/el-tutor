import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, TextField, MenuItem } from '@material-ui/core';
import { Button, IconButton } from '@material-ui/core';
import { Delete as DeleteIcon } from '@material-ui/icons';
import { SearchInput } from '../../../../../components';
import styles from './styles';

const UsersToolbar = props => {
  const {
    classes,
    className,
    toggleDialog,
    selectedUsers,
    deleteUser,
    search,
    onChangeSearch,
    role,
    onChangeRole
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

        <TextField
          className={classes.roleField}
          fullWidth
          select
          label="Role"
          value={role}
          variant="outlined"
          onChange={onChangeRole}
        >
          {['all', 'admin', 'student', 'teacher'].map(option => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </TextField>

        <div>
          {selectedUsers.length > 0 && (
            <IconButton className={classes.deleteButton} onClick={deleteUser}>
              <DeleteIcon />
            </IconButton>
          )}
          <Button onClick={toggleDialog} color="primary" size="small" variant="outlined">
            {selectedUsers.length === 1 ? 'Edit' : 'Add'}
          </Button>
        </div>
      </div>
    </div>
  );
};

UsersToolbar.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  selectedUsers: PropTypes.array
};

UsersToolbar.defaultProps = {
  selectedUsers: []
};
export default withStyles(styles)(UsersToolbar);
