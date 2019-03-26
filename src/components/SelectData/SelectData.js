import React, {Component} from 'react';
import Form from '../UI/Form/Form';
import classes from './SelectData.css';

class selectData extends Component {
  state = {
    formInputs : {
      startDate: {
        type: 'input', 
        elementConfig: {
            type: 'date',
            placeholder: 'Start Date'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      endDate: {
        type: 'input', 
        elementConfig: {
          type: 'date',
          placeholder: 'End Date'
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      },
      account: {
        type: 'select', 
        elementConfig: {
            options: [
                {value: 'Zuzanna Konto'},
                {value: 'Piotr Konto'},
                {value: 'Zuzanna 2'}, 
                {value: 'Piotr 2'}
            ]
        },
        value: '',
        validation: {
            required: true
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false
  }
  
  inputHandler = (e, inputID) => {
    let inputForm = { ...this.state.formInputs};
    let element = { ...inputForm[inputID]};
    element.value = e.target.value;
    element.touched = true;
    inputForm[inputID] = element;
    let formIsValid = true;
    for(let i in inputForm){
        formIsValid = inputForm[i].valid && formIsValid;
    }
    this.setState({formInputs: inputForm, formIsValid: formIsValid});
}

  render() { 
  const formElementsArray = [];
  for (let key in this.state.formInputs){
      formElementsArray.push({
          id: key,
          config: this.state.formInputs[key]
      })
  }
  return (
    <div className={classes.selectData}>
      <h1>PLEASE SELECT PARAMS</h1>
      <Form 
        inputs={formElementsArray} 
        clicked={this.props.setParams} 
        inputHandler={this.inputHandler}
        actionName='ADD'
      />
    </div>
  )
  }
}

export default selectData;