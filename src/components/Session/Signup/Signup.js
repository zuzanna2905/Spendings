import React, { Component } from 'react';
import Form from '../../UI/Form/Form';
import classes from './Signup.css';

class signup extends Component {
    state = {
        formInputs : {
            username: {
                type: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email : {
                type: 'input',                 
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            password: {
                type: 'input', 
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password',
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    inputHandler = (inputID, e) => {
        let inputForm = { ...this.state.formInputs};
        let element = { ...inputForm[inputID]};
        element.value = e;
        element.valid = this.checkValidity(element.value, element.validation)
        element.touched = true;
        inputForm[inputID] = element;
        let formIsValid = true;
        for(let i in inputForm){
            formIsValid = inputForm[i].valid && formIsValid;
        }
        this.setState({formInputs: inputForm, formIsValid: formIsValid});
    }

    checkValidity = (value, rules) =>{
        let isValid = true;
        if(rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        return isValid;
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
            <div className={classes.Signup}>
                <h1>Sign up for application</h1>
                <Form 
                    inputs={formElementsArray} 
                    clicked={()=>null}
                    inputHandler={this.inputHandler}
                    actionName='Sign up'
                    disabled={!this.state.formIsValid}
                />
            </div>
        );
    }
}

export default signup;