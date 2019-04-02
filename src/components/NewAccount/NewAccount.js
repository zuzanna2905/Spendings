import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const newAccount = (props) => {
  return (
    <div>
        <p>Set account name (min-length: 3)</p>
        <input 
            name='name' 
            placeholder='Name' 
            type='text' 
            value={props.newAcc}
            onChange={props.addAccountHandler}
        />
        <button disabled={props.newAcc.length < 3} onClick={() => props.addNewAccount()}>Add Acount</button>
    </div>
  )
}

const mapStateToProps = state => {
    return {
        newAcc: state.prof.newAccount
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewAccount: () => dispatch(actions.addAccount()),
        addAccountHandler: (e) => dispatch(actions.setAccount(e.target.value))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(newAccount);