import * as actionTypes from './actionTypes';

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