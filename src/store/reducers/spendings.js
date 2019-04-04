import * as actions from '../actions/actionTypes';
import { Filters} from "react-data-grid-addons";

const initialState = {
    categories : null,
    spendings: null,
    columns: null,
    filterParams: {
        startDate: '',
        endDate: '',
        account: ''
    },
    loading: false
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
            filter = Filters.SingleSelectFilter;
            break;
        default:
            filter = Filters.NumericFilter
            break;
    }
    return filter;
}

const reducer = (state= initialState, action) => {
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
        case actions.ADD_SPENDING:
            return {
                ...state,
                spendings: state.spendings.concat(action.spending)
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
            console.log(action.columns)
            const newColumns = action.columns.map(c => {
                return {
                key: c.column_name,
                name: c.column_name.charAt(0).toUpperCase() + c.column_name.slice(1),
                editable: true,
                resizable: true,
                sortable: true,
                filterable: true,
                filterRenderer: setFilter(c)}
            })
            console.log(newColumns)
            return {
                ...state,
                columns: newColumns
            }
        default:
            return state;
    }
}

export default reducer;