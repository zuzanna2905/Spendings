import * as actions from '../actions/actionTypes';
import { Filters } from "react-data-grid-addons";

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

const setFilter = (column) => {
    let filter = null;
    switch(column.data_type){
        case 'integer':
            filter = Filters.NumericFilter;
            break;
        case 'numeric':
            filter = Filters.NumericFilter;
            break;
        case 'character varying':
            filter = Filters.MultiSelectFilter;
            break;
        default:
            filter = Filters.NumericFilter
            break;
    }
    switch(column.column_name){
        case 'category':
            filter = Filters.SingleSelectFilter;
            break;
        case 'account': 
            filter = Filters.SingleSelectFilter;
            break;
        default:
            break;
    }
    return filter;
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
                spendings: state.spendings.concat(action.spending), //zmienić na push
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
                key: c.column_name,
                name: c.column_name.charAt(0).toUpperCase() + c.column_name.slice(1),
                editable: true,
                resizable: true,
                filterable: true,
                filterRenderer: setFilter(c)
            }})
            return {
                ...state,
                columns: newColumns
            }
        case actions.UPDATE_DATA_SUCCESS:
            return {
                ...state,
                spendings: action.spendings
            }
        case actions.ADDING_INIT:
            return {
                ...state,
                added: false
            }
        default:
            return state;
    }
}

export default reducer;