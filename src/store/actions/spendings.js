import * as actionTypes from './actionTypes';
const spend = 'http://localhost:3001/spendings';
const cat = 'http://localhost:3001/categories';

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

export const fetchSpendingsStart = () => {
    return {
        type: actionTypes.FETCH_SPENDINGS_START,
        loading: true
    }
}

export const fetchSpendingsSuccess = (spendings) => {
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

export const fetchSpendings = (query) => {
    return dispatch => {
        dispatch(fetchSpendingsStart());
        fetch(spend + query, {
            method: 'get',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(spendings=> {        
            dispatch(fetchSpendingsSuccess(spendings))
        })
        .catch(err => {
            dispatch(fetchSpendingsFail(err))
        })
    }
}

export const fetchCategories = () => {
    return dispatch => {
        dispatch(fetchCategoriesStart());
        fetch(cat, {
            method: 'get',
            headers: {'Content-Type' : 'application/json'}
        })
        .then(response => response.json())
        .then(cats => {
            dispatch(fetchCategoriesSuccess(cats))
        })        
        .catch(err => {
            dispatch(fetchCategoriesFail(err))
        })
    }
}