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
            changed={(e) => props.inputHandler(e, input.id)}
          />
        case('select'):
          return <Select 
            key={input.id} 
            value={input.config.value} 
            name={input.id} 
            options={input.config.elementConfig.options} 
            InputChange={props.changed}
            changed={(e) => props.inputHandler(e, input.id)}
          />
        default:
          return <Input 
            key={input.id} 
            value={input.config.value} 
            {...input.config.elementConfig}  
            name={input.id} 
            InputChange={props.changed}
            changed={(e) => props.inputHandler(e, input.id)}
          />
      
      }
    })
  }
  return (
    <form className={classes.Form} onSubmit={props.clicked}>
      {inputs}
      <button className={classes.Button}>{props.actionName}</button>
    </form>
  )
}

export default form;
