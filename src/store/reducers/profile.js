import * as actions from '../actions/actionTypes';

const initialState = {
    profile: {    
        name: 'Susan',
        email: 'susan@gmail.com',
        age: 23,
        town: 'Gdańsk',
        street: 'Leśna 15',
        postCode: '20040',
        country: 'Poland'
    },
    accounts : null,
    newAccount: '',
    newValue: '',
    loading: false
}

const reducer = (state = initialState, action) => {
    let newAccounts = null;
    let index = null;
    switch(action.type){
        case actions.ADD_ACCOUNT_SUCCESS:
            return {
                ...state, 
                accounts : state.accounts.concat({name: state.newAccount, id: (Math.random() * 1000).toFixed(0), edit: false}),
                newAccount: ''
            }
        case actions.REMOVE_ACCOUNT:
            newAccounts = state.accounts.filter(account => account.id !== action.accountId)
            return {
                ...state, 
                accounts: newAccounts
            }
        case actions.EDIT_ACCOUNT:
            newAccounts = [...state.accounts];
            index = newAccounts.findIndex((elem)=> elem.id === action.accountId);
            newAccounts[index] =  {id: action.accountId, name: state.newValue, edit: false};
            return {
                ...state, 
                accounts: newAccounts,
                newValue: ''
            }
        case actions.SET_ACCOUNT: 
            return {
                ...state, 
                newAccount: action.value
            }
        case actions.NEW_ACCOUNT_NAME:
            return {
                ...state,
                newValue: action.value
            }
        case actions.EDIT_ON:
            newAccounts = [...state.accounts];
            let accounts = newAccounts.map(account => {
                if(account.id === action.accountId){
                    return {...account, edit: !account.edit}
                }else {
                    return {...account, edit: false}
                }
            })
            return {
                ...state, 
                accounts: accounts
            }
        case actions.FETCH_ACCOUNTS_START:
            return {
                ...state,
                loading: action.loading
            }
        case actions.FETCH_ACCOUNTS_SUCCESS:
        console.log(action.accounts)
            return {
                ...state,
                loading: action.loading,
                accounts: action.accounts
            }
        case actions.FETCH_ACCOUNTS_FAIL:
            return {
                ...state,
                loading: action.loading
            }
        case actions.ADD_SPENDING_START:
            return {
                ...state
            }
        case actions.ADD_SPENDING_SUCCESS:
            return {
                ...state
            }
        case actions.ADD_SPENDING_FAIL:
            return {
                ...state
            }
        case actions.DELETE_SPENDING_START:
            return {
                ...state
            }
        case actions.DELETE_SPENDING_SUCCESS:
            return {
                ...state
            }       
        case actions.DELETE_SPENDING_FAIL:
            return {
                ...state
            }     
        default: 
            return state;
    }
}

export default reducer;