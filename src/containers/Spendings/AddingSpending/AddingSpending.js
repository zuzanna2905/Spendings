import React, {Component} from 'react';
import Form from '../../../components/UI/Form/Form';
import classes from './AddingSpending.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Spending extends Component {
    state = {
        formInputs : {
            name: {
                type: 'input', 
                elementConfig: {
                    type: 'text',
                    placeholder: 'Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
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
                elementConfig: {},
                value: '1',
                id: 1,
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            date: {
                type: 'input', 
                elementConfig: {
                    type: 'date',
                    placeholder: 'Date',
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
                elementConfig: {},
                value: '1',
                id: 1,
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
                valid: false,
                touched: false
            }
        },
        formIsValid: true,
        loading: false
    }

    // componentWillMount () {
    //     this.props.addingInit();
    // }

    componentDidMount = () => {
        const categories = this.props.categories ? this.props.categories.map(c => {
            return {
                id: c.id,
                value: c.name
            }}) : null;
        const accounts = this.props.accounts ? this.props.accounts.map(a => {
            return {
                id: a.id,
                value: a.name
            }
        }) : null;
        this.setState(prevState => ({
            ...prevState,
            formInputs : {
                ...prevState.formInputs,
                category: { 
                    ...prevState.formInputs.category,
                    elementConfig : {
                        ...prevState.formInputs.category.elementConfig,
                        options: categories
                    }
                },
                account: {
                    ...prevState.formInputs.account,
                    elementConfig : {
                        ...prevState.formInputs.account.elementConfig,
                        options: accounts
                    }
                }
            }
        }))
    }

    inputHandler = (inputID, e) => {
        let inputForm = { ...this.state.formInputs};
        let element = { ...inputForm[inputID]};
        let option = null;
        element.value = e;
        element.valid = this.checkValidity(element.value, element.validation)
        element.touched = true;
        switch(inputID){
            case 'category':
                option = element.elementConfig.options.filter( o => 
                    {
                        return o.value === e
                    })
                element.id = option[0].id;
                break;
            case 'account':
                option = element.elementConfig.options.filter( o => 
                    {
                        return o.value === e
                    })
                element.id = option[0].id;
                break;
            default:
                break;
        }
        inputForm[inputID] = element;
        let formIsValid = true;
        for(let i in inputForm){
            formIsValid = inputForm[i].valid && formIsValid;
        }
        this.setState({formInputs: inputForm, formIsValid: true});
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
                    clicked={() =>this.props.spendingSubmitHandler(this.props.token, { 
                            name: this.state.formInputs.name.value,
                            category: this.state.formInputs.category.id,
                            value: +this.state.formInputs.value.value,
                            date: this.state.formInputs.date.value,
                            account: this.state.formInputs.account.id,
                            description: this.state.formInputs.description.value,
                            user: this.props.userId
                        })
                    }
                    inputHandler={this.inputHandler}
                    actionName='ADD'
                    disabled={!this.state.formIsValid}
                />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        categories: state.spend.categories,
        added: state.spend.added,
        accounts: state.prof.accounts,
        userId: state.sess.userId,
        token: state.sess.token
    }
}

const mapDispatchToProps = dispatch => {
    return {
        spendingSubmitHandler: (token, spending) => dispatch(actions.addSpending(token, spending)),
        addingInit: () => dispatch(actions.addingInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spending);