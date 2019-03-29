import React from 'react';
import Form from '../UI/Form/Form';
import classes from './SelectData.css';

const selectData = (props) => {
  const formElementsArray = [];
  for (let key in props.paramsInputs){
      formElementsArray.push({
          id: key,
          config: props.paramsInputs[key]
      })
  }
  return (
    <div className={classes.selectData}>
      <h1>PLEASE SELECT PARAMS</h1>
      <Form 
        inputs={formElementsArray}
        inputHandler={props.inputHandler}
        hidden={true}
        actionName='SET'
        clicked={props.setFilters}
      />
    </div>
  )
}

export default (selectData);