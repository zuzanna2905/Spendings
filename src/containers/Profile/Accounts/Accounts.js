import React, { Component, Fragment } from 'react';
import Account from '../../../components/Account/Account';
import classes from './Accounts.css';
import { connect } from 'react-redux';
import NewAccount from '../../../components/NewAccount/NewAccount';
import Spinner from '../../../components/UI/Spinner/Spinner';

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
        let accounts = <Spinner />
        if(this.props.accounts){
            accounts = 
            <Fragment>
                <ul hidden={!this.state.showAccounts} className={classes.List}>
                {
                    this.props.accounts.map(account => <Account account={account} key={account.id}/>)
                }
                </ul>
            </Fragment>
        }
        return (
            <div className={classes.Accounts}>
                <h3>Accounts managing</h3>
                <button onClick={this.showAccountsHandler}>{buttonLabel}</button>
                <button onClick={this.showAccountAddingHandler}>Create new Account</button>
                    {inputAccount}
                    {accounts}
            </div>
        );
    }
}

const mapStateToProps = state =>{
    return {
        accounts: state.prof.accounts,
        loading: state.prof.loading
    }
}

export default connect(mapStateToProps)(Accounts);