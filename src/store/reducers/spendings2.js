import * as actions from '../actions/actionTypes';

const initialState = {
    categories : null,
    spendings: null,
    columns: null,
    filterParams: {
        startDate: '',
        endDate: '',
        account: ''
    },
    loading: false,
    added: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actions.SET_PARAM_VALUE:
            let inputForm = state.filterParams;
            let element = { ...inputForm[action.inputID]};
            element = action.value;
            inputForm[action.inputID] = element;
            return {
                ...state,
                filterParams: inputForm
            }
        case actions.ADD_SPENDING_SUCCESS:
            return {
                ...state,
                spendings: state.spendings.concat(action.spending),
                added: true
            }
        case actions.ADD_SPENDING_START:
            return {
                ...state,
                added: true
            }
        case actions.ADD_SPENDING_FAIL: 
            return {
                ...state,
                added: true
            }
        case actions.FECTH_SPENDINGS_FAIL:
            return {
                ...state,
                loading: action.loading
            }
        case actions.FETCH_SPENDINGS_START:
            return {
                ...state,
                loading: action.loading
            }
        case actions.FETCH_SPENDINGS_SUCCESS:
            return{
                ...state,
                spendings: action.spendings,
                loading: action.loading
            }
        case actions.FETCH_CATEGORIES_START:
            return {
                ...state,
                loading: action.loading
            }
        case actions.FETCH_CATEGORIES_SUCCESS:
            return {
                ...state,
                loading: action.loading,
                categories: action.categories
            }
        case actions.FETCH_CATEGORIES_FAIL:
            return {
                ...state,
                loading: action.loading
            }
        case actions.GET_COLUMNS_SUCCESS:
            const newColumns = action.columns.map(c => {
                return {
                title: c.name,
                name: c.name
            }})
            return {
                ...state,
                columns: newColumns
            }
        case actions.UPDATE_DATA_SUCCESS:
            const rows = state.spendings.map(row => (action.spending.id === row.id ? action.spending : row));
            return {
                ...state,
                spendings: rows
            }
        case actions.ADDING_INIT:
            return {
                ...state,
                added: false
            }
        case actions.DELETE_SPENDING_FAIL:
            return {
                ...state
            }
        case actions.DELETE_SPENDING_START: 
            return {
                ...state
            }
        case actions.DELETE_SPENDING_SUCCESS:
            const rows2 = state.spendings.filter(row => action.spendingId !== row.id);
            return{
                ...state,
                spendings: rows2
            }
        default:
            return state;
    }
}

export default reducer;