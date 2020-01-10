import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../store/actions';
import classnames from 'classnames';
import { withStyles, Typography, List, ListItem } from '@material-ui/core';

// Component styles
import styles from './styles';
import UserPopover from './components/UserPopover/UserPopover';

class Navbar extends Component {
  state = { showMenu: false, scrollPos: window.pageYOffset };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    this.setState({
      scrollPos: window.pageYOffset
    });
  };

  render() {
    const { showMenu, scrollPos } = this.state;
    const { classes, isAuth, logout } = this.props;
    return (
      <Fragment>
        <nav
          className={classnames({
            [classes.navbar]: true,
            [classes.navbarColor]: scrollPos > 30
          })}
        >
          <Link className={classes.logoLink} to="/">
            <Typography className={classes.logo} variant="h2">
              _el Tutor
            </Typography>
          </Link>
          <div className={classes.navLinks}>
            {!isAuth ? (
              <>
                <Link className={classes.navLink} to="/">
                  Home
                </Link>
                <Link className={classes.navLink} to="/login">
                  Login
                </Link>
                <Link className={classes.navLink} to="/register">
                  Register
                </Link>
              </>
            ) : (
              <Link className={classes.navLink} to="/admin/account">
                Account
              </Link>
            )}
            <Link className={classes.navLink} to="/">
              Option 1
            </Link>
            <Link className={classes.navLink} to="/">
              Option 2
            </Link>
          </div>

          <div className={classes.navAccount}>
            <UserPopover logout={logout}>
              <List component="nav">
                {isAuth ? (
                  <ListItem>
                    <Link className={classes.navLink} onClick={logout} to="/">
                      Logout
                    </Link>
                  </ListItem>
                ) : (
                  <ListItem>
                    <Link className={classes.navLink} to="/login">
                      Login
                    </Link>
                  </ListItem>
                )}
              </List>
            </UserPopover>
          </div>

          <div className={classes.navMobile}>
            <div
              className={classes.navIcon}
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
            >
              <div className={classnames(classes.navIconLine, classes.navIconLine__left)} />
              <div className={classes.navIconLine} />
              <div className={classnames(classes.navIconLine, classes.navIconLine__right)} />
            </div>
          </div>
        </nav>
        <div
          className={classnames({
            [classes.navActive]: showMenu,
            [classes.nav]: true
          })}
        >
          <div className={classes.navContent}>
            <div className={classes.currentPageShadow}>Tutor</div>
            <ul
              className={classes.innerNav}
              onClick={() => this.setState({ showMenu: !this.state.showMenu })}
            >
              <li className={classes.innerNavListItem}>
                <Link className={classes.innerNavLink} to="/">
                  Home
                </Link>
              </li>
              {!isAuth ? (
                <>
                  <li className={classes.innerNavListItem}>
                    <Link className={classes.innerNavLink} to="/login">
                      Login
                    </Link>
                  </li>
                  <li className={classes.innerNavListItem}>
                    <Link className={classes.innerNavLink} to="/register">
                      Register
                    </Link>
                  </li>
                </>
              ) : (
                <li className={classes.innerNavListItem}>
                  <Link className={classes.innerNavLink} to="/admin/account">
                    Account
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuth: state.authState.isAuthenticated,
  user: state.authState.user
});

const mapDispatchToProps = {
  logout
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar));
