import React, { Component } from 'react';
import Table2 from './Table/Table2';
import AddSpending from './AddingSpending/AddingSpending';
import {NavLink, Route} from 'react-router-dom';
import classes from './Spendings.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import AddingSpending from './AddingSpending/AddingSpending';

class Spendings extends Component {
    state = {
        showNewAdding: false
    }

    showAddingHandler = () =>{
        this.setState({showNewAdding: true, showParamsSelecting: false})
    }

    componentWillMount () {
        this.props.setColumns();
        this.props.fetchCategories();
        this.props.fetchSpendings(this.props.token, this.props.userId);
        this.props.fetchAccounts(this.props.token, this.props.userId);
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

        return (
            <div className={classes.Spendings}>
                <Table2/>
                {newSpendings}
                <nav className={classes.Navigation}>
                    <NavLink className={classes.Button} to={this.props.match.url + '/new'}>New Spending</NavLink>
                </nav>
                <Route path={this.props.match.path + '/new'} 
                component={AddingSpending}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        added: state.spend.added,
        token: state.sess.token,
        userId: state.sess.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setParamsValue: (paramId, value) => dispatch(actions.setParamValue(paramId, value)),
        fetchCategories: () => dispatch(actions.fetchCategories()),
        fetchSpendings: (token, userId) => dispatch(actions.fetchSpendings(token, userId)),
        setColumns: () => dispatch(actions.setColumns()),
        fetchAccounts: (token, userId) => dispatch(actions.fetchAccounts(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spendings);