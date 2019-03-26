import React, {Fragment} from 'react';
import classes from './Input.css';

const input = (props) => {
  return (
      <Fragment>
        <label className={classes.Label}>{props.placeholder}</label>
        <input 
          onChange={props.changed} 
          value={props.value} 
          className={classes.Input} 
          type={props.type} 
          name={props.name}
          placeholder={props.placeholder}
        />
      </Fragment>
  )
}

export default input;