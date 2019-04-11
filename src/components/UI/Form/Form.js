import React from 'react';
import Input from '../Input/Input';
import Select from '../Select/Select';
import classes from './Form.css';

const form = (props) => {
  let inputs = null;
  if(props.inputs){
    inputs = props.inputs.map(input =>{
      switch(input.config.type){
        case('input'): 
          return <Input 
            key={input.id} 
            value={input.config.value} 
            {...input.config.elementConfig}  
            name={input.id}
            changed={(e) => props.inputHandler(input.id, e.target.value)}
          />
        case('select'):
          return <Select 
            key={input.id} 
            value={input.config.value} 
            name={input.id} 
            options={input.config.elementConfig.options}
            changed={(e) => props.inputHandler(input.id, e.target.value)}
          />
        default:
          return <Input 
            key={input.id} 
            value={input.config.value} 
            {...input.config.elementConfig}  
            name={input.id}
            changed={(e) => props.inputHandler(input.id, e.target.value)}
          />
      
      }
    })
  }
  return (
    <form className={classes.Form} onSubmit={props.clicked}>
      {inputs}
      <button hidden={props.hidden} disabled={props.disabled} className={classes.Button}>{props.actionName}</button>
    </form>
  )
}

export default (form);
