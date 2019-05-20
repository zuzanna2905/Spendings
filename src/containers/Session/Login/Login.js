import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Form from '../../../components/UI/Form/Form';
import classes from './Login.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class login extends Component {
    state = {
        formInputs : {
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
        loading: false, 
        isSignup: false
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
    
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.formInputs.email.value, this.state.formInputs.password.value, this.state.isSignup)
    }

    render() {   
        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to='/spendings'/>
        }

        const formElementsArray = [];
        for (let key in this.state.formInputs){
            formElementsArray.push({
                id: key,
                config: this.state.formInputs[key]
            })
        }
        return (
            <div className={classes.Login}>
                {authRedirect}
                <h1>Log in for application</h1>
                <Form 
                    inputs={formElementsArray} 
                    clicked={this.submitHandler}
                    inputHandler={this.inputHandler}
                    actionName='Log in'
                    disabled={!this.state.formIsValid}
                />
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        isAuthenticated: state.sess.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(login);