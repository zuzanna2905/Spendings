import React, { Component } from 'react';
import SelectData from '../../components/SelectData/SelectData';
import Table from './Table/Table';
import Charts from './Charts/Charts';
import AddSpending from './AddingSpending/AddingSpending';
import {NavLink, Route} from 'react-router-dom';
import classes from './Spendings.css';
//import queryString from 'query-string';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../store/actions';

//const spend = 'http://localhost:3001/spendings';
//const cat = 'http://localhost:3001/categories';

class Spendings extends Component {
    state = {
        paramsInputs: {
            startDate: {
            type: 'input', 
            elementConfig: {
                type: 'date',
                placeholder: 'Start Date'
            },
            value: moment().day(-30).format('YYYY-MM-DD'),
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
                value: moment().format('YYYY-MM-DD'),
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
        }
    }

    //componentDidUpdate = (nextProps, nextState) => {
        // if(nextState.paramsInputs === this.state.paramsInputs){
        //     return;
        // }
        // const query = '?' + queryString.stringify({
        //     start : new Date(this.state.paramsInputs.startDate.value).toISOString(),
        //     end :  new Date(this.state.paramsInputs.endDate.value).toISOString(),
        //     account : this.state.paramsInputs.account.value
        // });
        // console.log(query)
        // fetch(cat, {
        //     method: 'get',
        //     headers: {'Content-Type' : 'application/json'}
        //   })
        //   .then(response => response.json())
        //   .then(categories => {
        //       const categoryTypes = categories.map(c => {
        //           return {
        //               id: c.id,
        //               value: c.category
        //           }
        //       })
        //       this.setState({categoryTypes: categoryTypes})
        //   })
        //   .then(x => {
        //     fetch(spend + query, {
        //         method: 'get',
        //         headers: {'Content-Type' : 'application/json'},
        //     })
        //     .then(response => response.json())
        //     .then(spendings=> {        
        //         this.setState({
        //             spendings: spendings
        //         })
        //     })
        // })
   // }

    inputHandler = (inputID, e) => {
        let inputForm = { ...this.state.paramsInputs};
        let element = { ...inputForm[inputID]};
        element.value = e;
        element.touched = true;
        inputForm[inputID] = element;
        this.setState({paramsInputs: inputForm});
        this.props.setParamsValue(inputID, e)
    }

    render() {
        return (
            <div className={classes.Spendings}>
                <SelectData 
                    paramsInputs={this.state.paramsInputs}
                    inputHandler={this.inputHandler}/>
                <nav className={classes.Navigation}>
                    <NavLink to={this.props.match.url + '/table'}> Spending Table</NavLink>
                    <NavLink to={this.props.match.url + '/charts'}> Spending Charts</NavLink>
                    <NavLink to={this.props.match.url + '/new'}>Add Spending</NavLink>
                </nav>    
                <Route path={this.props.match.path + '/table'} 
                component={Table}/>
                <Route path={this.props.match.path + '/charts'} 
                component={Charts}/>
                <Route path={this.props.match.path + '/new'} 
                component={AddSpending}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setParamsValue: (paramId, value) => {dispatch({type: actions.SET_PARAM_VALUE, inputID: paramId, value: value})}
    }
}

export default connect(null, mapDispatchToProps)(Spendings);