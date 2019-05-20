import * as actionTypes from './actionTypes';
import queryString from 'query-string';
import axios from 'axios';
const spend = 'http://localhost:3001/spendings';

export const setParamValue = (id, value) => {
    return {
        type: actionTypes.SET_PARAM_VALUE,
        inputID: id,
        value: value
    }
}

export const addSpending = (spending) => {
    return dispatch => {
        dispatch(addSpendingStart());
        const query = queryString.stringify({          
            name: spending.name,
            category: spending.category,
            value: spending.value,
            account: spending.account,
            description: spending.description,
            date: spending.date//new Date(spending.date).toISOString() // nie lubi na string?
        })
        fetch('http://localhost:3001/spendings?' + query, {
            method: 'post',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(spendings=> {
            dispatch(addSpendingSuccess(spending));
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
            console.log('spends', spends)
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
            console.log('categories ',r.data)
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

export const updateData = (spendings, row) => {
    return dispatch => {
        dispatch(updateDataStart());
        const query = queryString.stringify({          
            name:row.name, 
            category:row.category, 
            value:row.value, 
            account:row.account, 
            description:row.description,
            date: new Date(row.date).toISOString()
        })
        fetch('http://localhost:3001/spendings/' + row.id + '?' + query, {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
        })
        .then(response => response.json())
        .then(x => {
            dispatch(updateDataSuccess(spendings));
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
            console.log('columns',r.data)
            dispatch(getColumnsSuccess(r.data))
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