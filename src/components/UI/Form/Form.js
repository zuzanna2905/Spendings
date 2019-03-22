import React from 'react';
import Input from './Input/Input';
import Select from './Select/Select';
import classes from './Form.css';

const form = (props) => {
  let inputs = null;
  if(props.inputs){
    inputs = props.inputs.map(input =>{
      if(input.category === 'input')
        return <Input key={input.id} type={input.type} label={input.label}/>
      else if(input.category === 'select')
        return <Select key={input.id} label={input.label} options={input.options}/>
      return null;
    })
  }
  return (
    <div className={classes.Form}>
      {inputs}
      <button className={classes.Button} onClick={props.clicked}>ADD</button>
    </div>
  )
}

export default form;
