import * as actions from '../actions';

const initialState = {
    profile: {    
        name: 'Susan',
        email: 'susan@gmail.com',
        age: 23
    },
    accounts : [
        {id: 1, value: 'Zuzanna Konto'},
        {id: 2, value: 'Piotr Konto'},
        {id: 3, value: 'Zuzanna 2'},
        {id: 4, value: 'Piotr 2'}
    ],
}

const reducer = (state = initialState, action) => {
    let newAccounts = null;
    switch(action.type){
        case actions.ADD_ACOUNT:
            return {
                ...state, 
                accounts : state.accounts.concat({value: action.account, id: (Math.random() * 1000).toFixed(0)})
            }
        case actions.REMOVE_ACCOUNT:
            newAccounts = state.accounts.filter(account => account.id !== action.accountId)
            return {
                ...state, 
                accounts: newAccounts
            }
        case actions.EDIT_ACCOUNT:
            newAccounts = [...state.accounts];
            let index = newAccounts.findIndex((elem)=> elem.id === action.accountId);
            newAccounts[index] =  {id: action.accountId, value: action.newName};
            return {
                ...state, 
                accounts: newAccounts
            }
        default: 
            return state;
    }
}

export default reducer;