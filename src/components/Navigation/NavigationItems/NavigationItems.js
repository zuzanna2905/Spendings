import React from 'react';
import classes from './NavigationItems.css'
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link='/home'>Home</NavigationItem>
      <NavigationItem link='/spendings'>Spendings</NavigationItem>
      <NavigationItem link='/reports'>Reports</NavigationItem>
      <NavigationItem link='/profile'>Profile</NavigationItem>
    </ul>
  )
}

export default navigationItems
