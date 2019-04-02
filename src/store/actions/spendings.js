import * as actionTypes from './actionTypes';

export const setParamValue = (id, value) => {
    return {
        type: actionTypes.SET_PARAM_VALUE,
        inputID: id,
        value: value
    }
}

export const addSpending = (spending) => {
    return {
        type: actionTypes.ADD_SPENDING,
        spending: spending
    }
}