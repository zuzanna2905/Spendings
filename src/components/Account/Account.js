import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const account = (props) => {
    const account = props.account;
    let editAccount = '';
    if(account.edit){
        editAccount = 
            <div>
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
    return (
    <li>
        <p>{account.name}</p>
        <button onClick={() => props.removeAccount(account.id)}>Delete</button>
        <button onClick={() => props.showEditAccount(account.id)}>Edit</button>
            {editAccount}
        <button disabled={props.newValue.length < 3} hidden={!account.edit} onClick={() => props.editAccount(account.id, props.newValue)}>Set New Name</button>
    </li>
  )
}

const mapStateToProps = state => {
    return {
        newValue: state.prof.newValue
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
