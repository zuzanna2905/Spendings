import React, {Component} from 'react';
import Form from '../../../components/UI/Form/Form';
import classes from './AddingSpending.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Spending extends Component {
    state = {
        formInputs : {
            value : {
                type: 'input',                 
                elementConfig: {
                    type: 'number',
                    placeholder: 'Spending value'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            category: {
                type: 'select', 
                elementConfig: {
                    options: [
                    {value: 'food'},
                    {value: 'home'},
                    {value: 'clothes'}
                    ]
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: false
            },
            date: {
                type: 'input', 
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date'
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
            },
            description: {
                type: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Description'
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            }
        },
        formIsValid: false,
        loading: false
    }

    componentWillMount () {
        // const categories = this.props.categories;
        // this.setState({
        //     formInputs: {
        //     category : {
        //         elementConfig : {
        //             options: categories
        //     }
        // }}})
        // console.log(this.state.formInputs)
    }

    spendingSubmitHandler = (e) => {
        // this.setState({loading: true})
        // const formData = {};
        // for(let elem in this.state.formInputs){
        //     formData[elem] = this.state.formInputs[elem].value;
        // }
        // fetch('http://localhost:3001/spendings', {
        //     method: 'post',
        //     headers: {'Content-Type' : 'application/json'},
        // })
        // .then(res=> {
        //     this.setState({loading: false});
        //     console.log(this.props);
        //     this.props.history.push('/')
        // })   
        // .catch(r => { this.setState({loading: false})})
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
            <div className={classes.Spending}>
                <h1>Add New Spending</h1>
                <Form 
                    inputs={formElementsArray} 
                    clicked={() => this.props.spendingSubmitHandler({
                            name: this.state.formInputs.description.value,
                            category: 1,//this.state.formInputs.category.value,
                            value: +this.state.formInputs.value.value,
                            date: this.state.formInputs.date.value,
                            account: 1 //this.state.formInputs.account.value
                    })} 
                    inputHandler={this.inputHandler}
                    actionName='ADD'
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.spend.categories
    }
}

const mapDispatchToProps = dispatch => {
    return {
        spendingSubmitHandler: (spending) => dispatch(actions.addSpending(spending))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spending);