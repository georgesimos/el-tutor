import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { Button, TextField } from '@material-ui/core';
import {
  Portlet,
  PortletHeader,
  PortletLabel,
  PortletContent,
  PortletFooter
} from '../../../../../components';

// Component styles
import styles from './styles';

class Account extends Component {
  state = {
    name: '',
    email: '',
    password: ''
  };

  componentDidMount() {
    const { name, email } = this.props.user;
    this.setState({ name, email });
  }

  handleFieldChange = (field, value) => {
    const newState = { ...this.state };
    newState[field] = value;
    this.setState(newState);
  };

  onUpdateUser = async () => {
    try {
      const { name, email, password } = this.state;
      const token = localStorage.getItem('jwtToken');
      let body = { name, email };
      if (password) body = { ...body, password };
      const url = '/api/users/me';
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      if (response.ok) {
        await response.json();
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    const { classes, className } = this.props;
    const { name, email, password } = this.state;

    const rootClassName = classNames(classes.root, className);

    return (
      <Portlet className={rootClassName}>
        <PortletHeader>
          <PortletLabel subtitle="The information can be edited" title="Profile" />
        </PortletHeader>
        <PortletContent noPadding>
          <form autoComplete="off" noValidate>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                helperText="Please specify the first name"
                label="FUll Name"
                margin="dense"
                required
                value={name}
                variant="outlined"
                onChange={event => this.handleFieldChange('name', event.target.value)}
              />
              <TextField
                className={classes.textField}
                label="Email Address"
                margin="dense"
                required
                value={email}
                variant="outlined"
                onChange={event => this.handleFieldChange('email', event.target.value)}
              />
            </div>
            <div className={classes.field}>
              <TextField
                className={classes.textField}
                label="New Password"
                margin="dense"
                type="password"
                value={password}
                variant="outlined"
                onChange={event => this.handleFieldChange('password', event.target.value)}
              />
            </div>
          </form>
        </PortletContent>
        <PortletFooter className={classes.portletFooter}>
          <Button color="primary" variant="contained" onClick={this.onUpdateUser}>
            Save details
          </Button>
        </PortletFooter>
      </Portlet>
    );
  }
}

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default withStyles(styles)(Account);
