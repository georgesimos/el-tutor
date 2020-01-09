import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { login } from '../../../../store/actions';
import { history } from '../../../../utils';
import styles from './styles';

const useStyles = makeStyles(styles);

function LoginForm(props) {
  const { isAuthenticated, user, redirect } = props;
  const classes = useStyles();
  const [values, setValues] = useState({ email: '', password: '' });

  useEffect(() => {
    if (isAuthenticated && redirect) {
      if (user && user.role === 'admin') return history.push('/admin/dashboard');
      return history.push('/');
    }
  }, [isAuthenticated, user, redirect]);

  const handleFieldChange = e =>
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });

  return (
    <form className={classes.form}>
      <Typography className={classes.title} variant="h2">
        Sign in
      </Typography>

      <div className={classes.fields}>
        <TextField
          className={classes.textField}
          label="email"
          name="email"
          onChange={event => handleFieldChange(event)}
          type="text"
          value={values.email}
          variant="outlined"
          placeholder="Use demo1"
        />
        <TextField
          className={classes.textField}
          label="password"
          name="password"
          onChange={event => handleFieldChange(event)}
          type="password"
          value={values.password}
          variant="outlined"
          placeholder="Use demo123456"
        />
      </div>

      <Button
        className={classes.loginButton}
        color="primary"
        onClick={() => props.login(values.email, values.password)}
        size="large"
        variant="contained"
      >
        Login now
      </Button>
      <Typography className={classes.register} variant="body1">
        Don't have an account?
        <Link className={classes.registerUrl} to="/register">
          register
        </Link>
      </Typography>
    </form>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.authState.isAuthenticated,
  user: state.authState.user
});
export default connect(mapStateToProps, { login })(LoginForm);
