import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles, CircularProgress } from '@material-ui/core';
import styles from './styles';
import { UsersToolbar, UsersTable, AddUser } from './components';
import {
  getUsers,
  deleteUser,
  selectUser,
  selectAllUsers,
  toggleUserDialog,
  addUser,
  updateUser
} from '../../../store/actions';
import { ResponsiveDialog } from '../../../components';
import { match } from '../../../utils';

class User extends Component {
  state = { search: '', role: 'all' };

  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getUsers();
  }

  handleSelect = selectedUsers => {
    this.setState({ selectedUsers });
  };

  onChangeSearch = e => this.setState({ search: e.target.value });
  onChangeRole = e => this.setState({ role: e.target.value });

  render() {
    const { search, role } = this.state;
    const {
      classes,
      users,
      selectedUsers,
      openDialog,
      toggleUserDialog,
      addUser,
      updateUser,
      deleteUser
    } = this.props;

    const filterByRole = role !== 'all' ? users.filter(user => user.role === role) : users;
    const filteredUsers = match(search, filterByRole, 'email');

    return (
      <div className={classes.root}>
        <UsersToolbar
          users={filteredUsers}
          search={search}
          onChangeSearch={this.onChangeSearch}
          role={role}
          onChangeRole={this.onChangeRole}
          selectedUsers={selectedUsers}
          toggleDialog={toggleUserDialog}
          deleteUser={() => deleteUser(selectedUsers[0])}
        />
        <div className={classes.content}>
          {!filteredUsers.length ? (
            <div className={classes.progressWrapper}>
              <CircularProgress />
            </div>
          ) : (
            <UsersTable
              onSelect={selectUser}
              onSelectAll={selectAllUsers}
              users={filteredUsers}
              selectedUsers={selectedUsers}
            />
          )}
        </div>
        <ResponsiveDialog id="Add-user" open={openDialog} handleClose={() => toggleUserDialog()}>
          <AddUser
            selectedUser={users.find(user => user._id === selectedUsers[0])}
            addUser={addUser}
            updateUser={updateUser}
          />
        </ResponsiveDialog>
      </div>
    );
  }
}

const mapStateToProps = ({ userState }) => ({
  users: userState.users,
  selectedUsers: userState.selectedUsers,
  openDialog: userState.openDialog
});
const mapDispatchToProps = {
  getUsers,
  selectUser,
  selectAllUsers,
  toggleUserDialog,
  addUser,
  updateUser,
  deleteUser
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(User));
