import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
  withStyles,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import AccountBoxIcon from '@material-ui/icons/AccountBoxOutlined';
// Component styles
import styles from './styles';

class Sidebar extends Component {
  render() {
    const { classes, user } = this.props;
    return (
      <section className={classes.root}>
        <List component="div" disablePadding>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/account"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <AccountBoxIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }} primary="Account" />
          </ListItem>

          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/lessons"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }} primary="Lessons" />
          </ListItem>
          <ListItem
            activeClassName={classes.activeListItem}
            className={classes.listItem}
            component={NavLink}
            to="/admin/grades"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }} primary="Grades" />
          </ListItem>
          {user && user.role === 'admin' && (
            <ListItem
              activeClassName={classes.activeListItem}
              className={classes.listItem}
              component={NavLink}
              to="/admin/users"
            >
              <ListItemIcon className={classes.listItemIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText classes={{ primary: classes.listItemText }} primary="Users" />
            </ListItem>
          )}
        </List>
        <Divider className={classes.listDivider} />
        <List
          component="div"
          disablePadding
          subheader={<ListSubheader className={classes.listSubheader}>Support</ListSubheader>}
        >
          <ListItem
            className={classes.listItem}
            component="a"
            href="http://georgesimos.com"
            target="_blank"
          >
            <ListItemIcon className={classes.listItemIcon}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText classes={{ primary: classes.listItemText }} primary="Customer support" />
          </ListItem>
        </List>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authState.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Sidebar));
