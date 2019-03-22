import React, {Fragment} from 'react';
import classes from './Input.css';

const input = (props) => {
  return (
      <Fragment>
        <label className={classes.Label}>{props.label}</label>
        <input className={classes.Input}type={props.type} name={props.label}></input>
      </Fragment>
  )
}

export default input
