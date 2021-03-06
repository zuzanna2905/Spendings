import * as actionTypes from './actionTypes';
import axios from 'axios';

export const addAccount = (account, token) =>{
    return dispatch => {
        dispatch(addAccountStart());
        axios.post('https://spendings-5d14b.firebaseio.com/accounts.json?auth=' + token, account)
        .then(r => {
            dispatch(addAccountSuccess(r.data.name));
        })
        .catch(err => {
            dispatch(addAccountFail(err))
        })
    }
}

export const addAccountStart = () => {
    return {
        type: actionTypes.ADD_ACCOUNT_START
    }
}

export const addAccountSuccess = (account) => {
    return {
        type: actionTypes.ADD_ACCOUNT_SUCCESS,
        account: account
    }
}

export const addAccountFail = () => {
    return {
        type: actionTypes.ADD_ACCOUNT_FAIL
    }
}

export const removeAccount = (token, accountId) =>{
    return dispatch => {
        dispatch(removeAccountStart());
        axios.delete(`https://spendings-5d14b.firebaseio.com/accounts/${accountId}.json?auth=` + token)
        .then(r => {
            dispatch(removeAccountSuccess(accountId));
        })
        .catch(err => {
            dispatch(removeAccountFail(err))
        })
    }
}

export const removeAccountStart = () => {
    return {
        type: actionTypes.REMOVE_ACCOUNT_START
    }
}

export const removeAccountSuccess = (accountId) => {
    return {
        type: actionTypes.REMOVE_ACCOUNT_SUCCESS, 
        accountId: accountId
    }
}
export const removeAccountFail = () => {
    return {
        type: actionTypes.REMOVE_ACCOUNT_FAIL
    }
}

export const setAccount = (value) => {
    return {
        type: actionTypes.SET_ACCOUNT,
        value: value
    }
}

export const editAccount = (id, name, token, userId) => {
    return dispatch => {
        dispatch(editAccountStart());
        axios.put(`https://spendings-5d14b.firebaseio.com/accounts/${id}.json?auth=` + token, {
            name: name,
            user: userId
        })
        .then(r=> {
            dispatch(editAccountSuccess(id));
        })
        .catch(err => {
            dispatch(editAccountFail(err))
        })
    }
}

export const editAccountStart = () => {
    return {
        type: actionTypes.EDIT_ACCOUNT_START
    }
}

export const editAccountSuccess = (accountId) => {
    return {
        type: actionTypes.EDIT_ACCOUNT_SUCCESS,
        accountId: accountId
    }
}

export const editAccountFail = () => {
    return {
        type: actionTypes.EDIT_ACCOUNT_FAIL
    }
}

export const editOn = (accountId) => {
    return {
        type: actionTypes.EDIT_ON,
        accountId: accountId
    }
}

export const newAccountName = (value) => {
    return {
        type: actionTypes.NEW_ACCOUNT_NAME,
        value: value
    }
}

export const fetchAccountsStart = () => {
    return {
        type: actionTypes.FETCH_ACCOUNTS_START,
        loading: true
    }
}

export const fetchAccountsSuccess = (accounts) => {
    return {
        type: actionTypes.FETCH_ACCOUNTS_SUCCESS,
        loading: false,
        accounts: accounts
    }
}

export const fetchAccountsFail = () => {
    return {
        type: actionTypes.FETCH_ACCOUNTS_FAIL,
        loading: false
    }
}

export const fetchAccounts = (token, userId) => {
    return dispatch => {
        dispatch(fetchAccountsStart());
        const queryParams = '?auth=' + token + '&orderBy="user"&equalTo="' + userId + '"';
        axios.get('https://spendings-5d14b.firebaseio.com/accounts.json' + queryParams)
        .then(r => {
            let accounts = [];
            for(let key in r.data){
                accounts.push({
                    ...r.data[key],
                    id: key
                })
            }
            dispatch(fetchAccountsSuccess(accounts))
        })        
        .catch(err => {
            dispatch(fetchAccountsFail(err))
        })
    }
}