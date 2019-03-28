import React, { Component } from 'react';
import Account from '../../../components/Account/Account';
import classes from './Accounts.css';
import { connect } from 'react-redux';
import NewAccount from '../../../components/NewAccount/NewAccount';

class Accounts extends Component {
    state = {
        showLabel : ['Show My Accounts', 'Hide Accounts'],        
        showAccounts: false,
        showInputAccount: false
    }

    showAccountsHandler = () =>{
        this.setState({showAccounts: !this.state.showAccounts})
    }

    showAccountAddingHandler = () =>{
        this.setState({showInputAccount: !this.state.showInputAccount})
    }

    render() {
        let buttonLabel = this.state.showLabel[0];
        if(this.state.showAccounts) {
            buttonLabel = this.state.showLabel[1];
        }
        let inputAccount = ''
        if(this.state.showInputAccount) {
            inputAccount = <NewAccount/>
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
                        this.props.accounts.map(account => <Account account={account} key={account.id}/>)
                    }
                </ul>
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        accounts: state.prof.accounts
    }
}

export default connect(mapStateToProps)(Accounts);