import React, { Fragment} from 'react';
import { connect } from 'react-redux';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/'>Home</NavigationItem>
      {!props.isAuthenticated 
      ? <Fragment>
          <NavigationItem link='/signup'>Sign up</NavigationItem>
          <NavigationItem link='/login'>Log in</NavigationItem>
        </Fragment>
      : <Fragment>
          <NavigationItem link='/spendings'>Spendings</NavigationItem>
          <NavigationItem link='/charts'>Charts</NavigationItem>
          <NavigationItem link='/reports'>Reports</NavigationItem>
          <NavigationItem link='/profile'>Profile</NavigationItem>
          <NavigationItem link='/logout'>Log out</NavigationItem>
        </Fragment>
      }
    </ul>
  )
}

const mapStateToProps = state =>{
  return {
      isAuthenticated: state.sess.token !== null
  }
}

export default connect(mapStateToProps)(navigationItems);
