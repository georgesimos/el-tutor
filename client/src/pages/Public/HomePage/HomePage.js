import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import styles from './styles';

class HomePage extends Component {
  render() {
    // const { classes } = this.props;
    return <div>Home Page</div>;
  }
}

HomePage.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

const mapStateToProps = ({ authState }) => ({
  user: authState.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(HomePage));
