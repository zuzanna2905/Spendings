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
import * as actions from '../../store/actions/index';

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
        },
        showNewAdding: false,
        showParamsSelecting: true
    }

    showAddingHandler = () =>{
        this.setState({showNewAdding: !this.state.showNewAdding, showParamsSelecting: false})
    }

    showSelectingHandler = () =>{
        this.setState({showParamsSelecting: !this.state.showParamsSelecting, showNewAdding: false})
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
        let newSpendings = null;
        if(this.state.showNewAdding){
            newSpendings = <AddSpending />
        }
        let paramsSelecting = null;
        if(this.state.showParamsSelecting){
            paramsSelecting = 
            <SelectData 
                paramsInputs={this.state.paramsInputs}
                inputHandler={this.inputHandler}/>
        }

        return (
            <div className={classes.Spendings}>
                <button className={classes.Button} onClick={this.showAddingHandler}>ADD SPENDING</button>
                <button className={classes.Button} onClick={this.showSelectingHandler}>FILTER SPENDINGS</button>
                {paramsSelecting}            
                {newSpendings}
                <nav className={classes.Navigation}>
                    <NavLink to={this.props.match.url + '/table'}> Spending Table</NavLink>
                    <NavLink to={this.props.match.url + '/charts'}> Spending Charts</NavLink>
                </nav>    
                <Route path={this.props.match.path + '/table'} 
                component={Table}/>
                <Route path={this.props.match.path + '/charts'} 
                component={Charts}/>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setParamsValue: (paramId, value) => dispatch(actions.setParamValue(paramId, value))
    }
}

export default connect(null, mapDispatchToProps)(Spendings);