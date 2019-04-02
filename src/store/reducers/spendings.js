import * as actions from '../actions/actionTypes';

const initialState = {
    categories : null,
    spendings: null,
    columns: [
        { key: 'name', name: 'Name', editable:true,resizable: true, sortable:true, type:'string' },
        { key: 'category', name: 'Category' , editable:true, resizable: true},
        { key: 'value', name: 'Value' , editable:true,resizable: true, sortable:true, type:'number'},
        { key: 'date', name: 'Date', editable:true,resizable: true},
        { key: 'account', name: 'Account', editable:true,resizable: true}
    ],
    filterParams: {
        startDate: '',
        endDate: '',
        account: ''
    },
    loading: false
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
            console.log(action.loading)
            return {
                ...state,
                loading: action.loading
            }
        case actions.FETCH_SPENDINGS_SUCCESS:
            console.log(action.spendings)
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
        console.log(action.categories)
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
        default:
            return state;
    }
}

export default reducer;