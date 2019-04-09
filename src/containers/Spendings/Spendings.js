import React, { Component } from 'react';
//import SelectData from '../../components/SelectData/SelectData';
import Table from './Table/Table';
import Charts from './Charts/Charts';
import AddSpending from './AddingSpending/AddingSpending';
import {NavLink, Route} from 'react-router-dom';
import classes from './Spendings.css';
import queryString from 'query-string';
import { connect } from 'react-redux';
import moment from 'moment';
import * as actions from '../../store/actions/index';
import AddingSpending from './AddingSpending/AddingSpending';

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

    componentWillMount () {
        const query = '?' + queryString.stringify({
            start : new Date(this.state.paramsInputs.startDate.value).toISOString(),
            end :  new Date(this.state.paramsInputs.endDate.value).toISOString(),
            account : this.state.paramsInputs.account.value
        });
        this.props.setColumns();
        this.props.fetchCategories();
        this.props.fetchSpendings(query);
        this.props.fetchAccounts();
    }

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
            // paramsSelecting = 
            // <SelectData 
            //     paramsInputs={this.state.paramsInputs}
            //     inputHandler={this.inputHandler}/>
        }

        return (
            <div className={classes.Spendings}>
                <h1>Here are your spendings</h1>
                <h3>Filter spending rows</h3>
                <Table/>
                <button className={classes.Button} onClick={this.showSelectingHandler}>FILTER SPENDINGS</button>
                {paramsSelecting}            
                {newSpendings}
                <nav className={classes.Navigation}>
                    <NavLink className={classes.Button} to={this.props.match.url + '/new'}>New Spending</NavLink>
                    <NavLink className={classes.Button} to={this.props.match.url + '/charts'}>Spending Charts</NavLink>
                </nav>
                <Route path={this.props.match.path + '/charts'} 
                component={Charts}/>
                <Route path={this.props.match.path + '/new'} 
                component={AddingSpending}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        added: state.spend.added
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setParamsValue: (paramId, value) => dispatch(actions.setParamValue(paramId, value)),
        fetchCategories: () => dispatch(actions.fetchCategories()),
        fetchSpendings: (query) => dispatch(actions.fetchSpendings(query)),
        setColumns: () => dispatch(actions.setColumns()),
        fetchAccounts: () => dispatch(actions.fetchAccounts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spendings);