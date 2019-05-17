import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import * as classes from './Account.css';

const account = (props) => {
    const account = props.account;
    let editAccount = '';
    if(account.edit){
        editAccount = 
            <div className={classes.Edit}>
                <p>New Name (min-length: 3)</p>
                <input
                    name='newname'
                    placeholder='New Name'
                    type='text'
                    value={props.newValue}
                    onChange={props.onChangeAccount}
                />
            </div>
    }
    let value = null;
    if (props.spendings) {
        value = <div>
        <p> My money: 0.00 {account.amount}</p>
        <p> All spends: {getValueOfSpends(props.spendings, account)} </p>
        <p> Last spend: {lastSpend(props.spendings, account)}</p>
        </div>;
    }
    return (
    <li>
        <h3>{account.name}</h3>
        {value}
        <button disabled={true} onClick={() => props.removeAccount(account.id)}>Delete</button>
        <button onClick={() => props.showEditAccount(account.id)}>Edit</button>
            {editAccount}
        <button disabled={props.newValue.length < 3} hidden={!account.edit} onClick={() => props.editAccount(account.id, props.newValue)}>Set New Name</button>
    </li>
  )
}

const getValueOfSpends = (spendings, account) => {
    let values = spendings.filter(s => s.account === account.id)
    return values.reduce((sum, i) => sum + parseInt(i.value), 0).toFixed(2)
}

const lastSpend = (spendings, account) => {
    let values = spendings.filter(s => s.account === account.id)
    let date = { value: 'no spends'};
    if (values[0]) {
        date = values.reduce(function (a, b) {
            return a.date > b.date ? a : b; 
        });
    }
    return date.value;
}

const mapStateToProps = state => {
    return {
        newValue: state.prof.newValue,
        spendings: state.spend.spendings
    }
}

const mapDispatchToProps = dispatch => {
    return {
        removeAccount: (id) => dispatch(actions.removeAccount(id)),
        editAccount: (id, name) => dispatch(actions.editAccount(id, name)),
        showEditAccount: (id) => dispatch(actions.editOn(id)),
        onChangeAccount: (e) => dispatch(actions.newAccountName(e.target.value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(account);
