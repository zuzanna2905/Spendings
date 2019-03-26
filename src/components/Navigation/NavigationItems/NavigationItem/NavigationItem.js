import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const navigationItem = (props) => {
  return (
    <div className={classes.NavigationItem}>
      <NavLink 
          to={props.link} 
          className={props.active ? classes.active : null}>
              {props.children}
      </NavLink>
    </div>
  )
}

export default navigationItem;