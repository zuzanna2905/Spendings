import React, { Component } from 'react';
import classes from './Profile.css';

const showLabel = ['Show Accounts', 'Hide Accounts'];

class Profile extends Component {
    state = {
        name: 'Susan',
        accounts : [
            {id: 1, value: 'Zuzanna Konto'},
            {id: 2, value: 'Piotr Konto'},
            {id: 3, value: 'Zuzanna 2'},
            {id: 4, value: 'Piotr 2'}
        ],
        email: 'susan@gmail.com',
        showAccounts: false,
        showInputAccount: false,
        account: ''
    }

    showAccountsHandler = () =>{
        this.setState({showAccounts: !this.state.showAccounts})
    }

    addAccountHandler = (e) =>{
        this.setState({account: e.target.value})
    }

    showAccountAddingHandler = () =>{
        this.setState({showInputAccount: !this.state.showInputAccount})
    }

    addNewAccountHandler = () => {
        this.setState({accounts : this.state.accounts.concat({value: this.state.account, id: Math.random()})})
    }

    removeAccount = (accountId) => {
        let newAccounts = this.state.accounts.filter(account => account.id !== accountId)
        this.setState({accounts: newAccounts})
    }

    editAccount = () => {

    }

    render() {
        let buttonLabel = showLabel[0]
        if(this.state.showAccounts) {
            buttonLabel = showLabel[1]
        }
        let inputAccount = ''
        if(this.state.showInputAccount) {
            inputAccount = 
            <div>
                <p>Set account Name</p>
                <input name='name' placeholder='Name' type='text' value={this.state.account} onChange={this.addAccountHandler}/>
                <button onClick={this.addNewAccountHandler}>Add Acount</button>
            </div>
        }
        return (
            <div className={classes.Profile}>
                <h1>PROFILE</h1>
                <div>
                    <h3>Your data</h3>
                    <p>Name: {this.state.name}</p>
                    <p>Email: {this.state.email}</p>
                </div>
                <div className={classes.Accounts}>
                    <h3>Accounts managing</h3>
                    <button onClick={this.showAccountsHandler}>{buttonLabel}</button>
                    <button onClick={this.showAccountAddingHandler}>Create new Account</button>
                    {inputAccount}
                    <ul hidden={!this.state.showAccounts} className={classes.List}>
                        Accounts ({this.state.accounts.length})
                        {
                            this.state.accounts.map(account => {
                                return <li key={account.id}>
                                    <p>{account.value}</p>
                                    <button onClick={() => this.removeAccount(account.id)}>Delete</button>
                                    <button onClick={this.editAccount}>Edit</button>
                                    </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default Profile;