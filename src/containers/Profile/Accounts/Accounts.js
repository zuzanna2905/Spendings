import React, { Component } from 'react';
import Account from '../../../components/Account/Account';
import classes from './Accounts.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

class Accounts extends Component {
    state = {
        showLabel : ['Show My Accounts', 'Hide Accounts'],        
        showAccounts: false,
        showInputAccount: false,
        showEditInput: false,
        account: '', 
        newName: ''
    }
    showAccountsHandler = () =>{
        this.setState({showAccounts: !this.state.showAccounts})
    }

    showAccountAddingHandler = () =>{
        this.setState({showInputAccount: !this.state.showInputAccount})
    }

    showAccountEditHandler = () =>{
        this.setState({showEditInput: !this.state.showEditInput})
    }

    editAccountHandler = (e) =>{
        this.setState({newName: e.target.value})
    }

    addAccountHandler = (e) =>{
        this.setState({account: e.target.value})
    }

    render() {
        let buttonLabel = this.state.showLabel[0];
        if(this.state.showAccounts) {
            buttonLabel = this.state.showLabel[1];
        }
        let inputAccount = ''
        if(this.state.showInputAccount) {
            inputAccount = 
            <div>
                <p>Set account Name</p>
                <input 
                    name='name' 
                    placeholder='Name' 
                    type='text' 
                    value={this.state.account} 
                    onChange={this.addAccountHandler}
                />
                <button onClick={() => this.props.addNewAccount(this.state.account)}>Add Acount</button>
            </div>
        }
        let editAccount = '';
        if(this.state.showEditInput){
            editAccount = 
                <div>
                    <p>New Name</p>
                    <input
                        name='newname'
                        placeholder='New Name'
                        type='text'
                        value={this.state.newName}
                        onChange={this.editAccountHandler}
                    />
                </div>
        }
        return (
            <div className={classes.Accounts}>
                <h3>Accounts managing</h3>
                <button onClick={this.showAccountsHandler}>{buttonLabel}</button>
                <button onClick={this.showAccountAddingHandler}>Create new Account</button>
                {inputAccount}
                <ul hidden={!this.state.showAccounts} className={classes.List}>
                    Accounts ({this.props.accounts.length})
                    {
                        this.props.accounts.map(account => <Account account={account}/>)
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        profile: state.profile,
        accounts: state.accounts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addNewAccount: (account) => {dispatch({type: actions.ADD_ACOUNT, account: account})},
        removeAccount: (id) => {dispatch({type: actions.REMOVE_ACCOUNT, accountId: id})},
        editAccount: (id, newName) => {dispatch({type: actions.EDIT_ACCOUNT, accountId: id, newName: newName})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Accounts);