import * as actionTypes from './actionTypes';
const acc = 'http://localhost:3001/accounts';

export const addAccount = () =>{
    return {
        type: actionTypes.ADD_ACOUNT
    }
}

export const removeAccount = (accountId) =>{
    return {
        type: actionTypes.REMOVE_ACCOUNT,
        accountId: accountId
    }
}

export const setAccount = (value) => {
    return {
        type: actionTypes.SET_ACCOUNT,
        value: value
    }
}

export const editAccount = (accountId) => {
    return {
        type: actionTypes.EDIT_ACCOUNT,
        accountId: accountId
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

export const fetchAccounts = () => {
    return dispatch => {
        dispatch(fetchAccountsStart());
        fetch(acc, {
            method: 'get',
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => response.json())
        .then(accs => {
            const accounts = accs.map(a =>{ 
                return {
                    ...a,
                    edit: false
                }
            })
            dispatch(fetchAccountsSuccess(accounts))
        })        
        .catch(err => {
            dispatch(fetchAccountsFail(err))
        })
    }
}