import * as actionTypes from './actionTypes';
import axios from 'axios';

export const setParamValue = (id, value) => {
    return {
        type: actionTypes.SET_PARAM_VALUE,
        inputID: id,
        value: value
    }
}

export const addSpending = (token, spending) => {
    return dispatch => {
        dispatch(addSpendingStart());
        axios.post('https://spendings-5d14b.firebaseio.com/spendings.json?auth=' + token, spending)
        .then(r => {
            dispatch(addSpendingSuccess(r.data));
        })
        .catch(err => {
            dispatch(addSpendingFail(err))
        })
    }
}

export const fetchSpendingsStart = () => {
    return {
        type: actionTypes.FETCH_SPENDINGS_START,
        loading: true
    }
}

export const fetchSpendingsSuccess = (spendings, columns) => {
    return {
        type: actionTypes.FETCH_SPENDINGS_SUCCESS,
        spendings: spendings,
        loading: false
    }
}

export const fetchSpendingsFail = (err) => {
    return {
        type: actionTypes.FECTH_SPENDINGS_FAIL,
        loading: false
    }
}

export const fetchCategoriesStart = () => {
    return {
        type: actionTypes.FETCH_CATEGORIES_START,
        loading: true
    }
}

export const fetchCategoriesSuccess = (categories) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_SUCCESS,
        categories: categories,
        loading: false
    }
}

export const fetchCategoriesFail = (err) => {
    return {
        type: actionTypes.FETCH_CATEGORIES_FAIL,
        loading: false
    }
}

export const fetchSpendings = (token, userId) => {
    return dispatch => {
        dispatch(fetchSpendingsStart());
        const queryParams = '?auth=' + token + '&orderBy="user"&equalTo="' + userId + '"';
        axios.get('https://spendings-5d14b.firebaseio.com/spendings.json' + queryParams)
        .then(r=> {
            let spends = [];
            for(let key in r.data){
                spends.push({
                    ...r.data[key],
                    id: key
                })
            }
            dispatch(fetchSpendingsSuccess(spends));
        })
        .catch(err => {
            dispatch(fetchSpendingsFail(err))
        })
    }
}

export const fetchCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesStart());
        axios.get('https://spendings-5d14b.firebaseio.com/categories.json')
        .then(r => {
            dispatch(fetchCategoriesSuccess(r.data))
        })
        .catch(err => {
            dispatch(fetchCategoriesFail(err))
        })
    }
}

export const updateDataStart = () => {
    return {
        type: actionTypes.UPDATE_DATA_START
    }
}

export const updateDataSuccess = (spendings) => {
    return {
        type: actionTypes.UPDATE_DATA_SUCCESS,
        spendings: spendings
    }
}

export const updateDataFail = () => {
    return {
        type: actionTypes.UPDATE_DATA_FAIL
    }
}

export const updateData = (token, spendingId, spending) => {
    return dispatch => {
        dispatch(updateDataStart());
        axios.put(`https://spendings-5d14b.firebaseio.com/spendings/${spendingId}.json?auth=` + token, spending)
        .then(x => {
            dispatch(updateDataSuccess(x.data));
        })
        .catch(err => {
            dispatch(updateDataFail(err))
        })
    }
}

export const addSpendingStart = () => {
    return {
        type: actionTypes.ADD_SPENDING_START
    }
}

export const addSpendingSuccess = (spending) => {
    return {
        type: actionTypes.ADD_SPENDING_SUCCESS,
        spending: spending
    }
}

export const addSpendingFail = () => {
    return {
        type: actionTypes.ADD_SPENDING_FAIL
    }
}

export const deleteSpendingStart = () => {
    return {
        type: actionTypes.DELETE_SPENDING_START
    }
}

export const deleteSpendingSuccess = () => {
    return {
        type: actionTypes.DELETE_SPENDING_SUCCESS
    }
}

export const deleteSpendingFail = () => {
    return {
        type: actionTypes.DELETE_SPENDING_FAIL
    }
}

export const getColumnsStart = () => {
    return {
        type: actionTypes.GET_COLUMNS_START
    }
}

export const getColumnsSuccess = (columns) => {
    return {
        type: actionTypes.GET_COLUMNS_SUCCESS,
        columns: columns
    }
}

export const getColumnsFail = () => {
    return {
        type: actionTypes.GET_COLUMNS_FAIL
    }
}

export const setColumns = () =>{
    return dispatch => {
        dispatch(getColumnsStart());
        axios.get('https://spendings-5d14b.firebaseio.com/columns.json')
        .then(r => {
            let columns = []
            for(let key in r.data){
                columns.push({
                    ...r.data[key],
                    id: key
                })
            }
            dispatch(getColumnsSuccess(columns))
        })        
        .catch(err => {
            dispatch(getColumnsFail(err))
        })
    }
}

export const addingInit = () => {
    return {
        type: actionTypes.ADDING_INIT
    }
}