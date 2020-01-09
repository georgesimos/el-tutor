import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Grid } from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import { ArrowBack as ArrowBackIcon } from '@material-ui/icons';
import styles from './styles';
import LoginForm from './LoginForm/LoginForm';

class Login extends Component {
  handleBack = () => {
    const { history } = this.props;
    history.goBack();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid className={classes.grid} container>
          <Grid className={classes.bgWrapper} item lg={5}>
            <div className={classes.bg} />
          </Grid>
          <Grid className={classes.content} item lg={7} xs={12}>
            <div className={classes.contentHeader}>
              <IconButton className={classes.backButton} onClick={this.handleBack}>
                <ArrowBackIcon />
              </IconButton>
            </div>
            <div className={classes.contentBody}>
              <LoginForm redirect />
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Login.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

export default withStyles(styles)(Login);
