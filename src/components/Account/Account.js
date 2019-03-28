import React from 'react';

const account = (props) => {
    const account = props.account;
    return (
    <li key={account.id}>
        <p>{account.value}</p>
        <button onClick={() => this.props.removeAccount(account.id)}>Delete</button>
        <button onClick={this.props.showAccountEditHandler}>Edit</button>
            {editAccount}
        <button hidden={!this.props.showEditInput} onClick={(id) => this.props.editAccount(account.id, this.props.newName)}>Set New Name</button>
    </li>
  )
}

export default account;
