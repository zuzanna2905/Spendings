import React, { Component } from 'react';
import Demo from './Table/Table2';
import classes from './Spendings.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Spendings extends Component {
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
        return (
            <div className={classes.Spendings}>
                <h3>SPENDINGS</h3>
                <Demo/>
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