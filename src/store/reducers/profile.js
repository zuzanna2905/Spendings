import * as actions from '../actions/actionTypes';

const initialState = {
    profile: {    
        name: 'Susan',
        email: 'susan@gmail.com',
        age: 23
    },
    accounts : [
        {id: 1, value: 'Zuzanna Konto', edit: false},
        {id: 2, value: 'Piotr Konto', edit: false},
        {id: 3, value: 'Zuzanna 2', edit: false},
        {id: 4, value: 'Piotr 2', edit: false}
    ],
    newAccount: '',
    newValue: ''
}

const reducer = (state = initialState, action) => {
    let newAccounts = null;
    let index = null;
    switch(action.type){
        case actions.ADD_ACOUNT:
            return {
                ...state, 
                accounts : state.accounts.concat({value: state.newAccount, id: (Math.random() * 1000).toFixed(0), edit: false}),
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
            newAccounts[index] =  {id: action.accountId, value: state.newValue, edit: false};
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
        default: 
            return state;
    }
}

export default reducer;