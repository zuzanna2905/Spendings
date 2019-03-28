import * as actions from '../actions';

const initialState = {
    categories : [
        {id: 1, name: 'food'},
        {id: 2, name: 'coffee'},
        {id: 3, name: 'rent'},
        {id: 4, name: 'charges'},
        {id: 5, name: 'clothes'},
        {id: 6, name: 'study'},
        {id: 7, name: 'recreation'},
        {id: 8, name: 'party'},
        {id: 9, name: 'phone'},
        {id: 10, name: 'transport'}
    ],
    spendings: [
        {name: 'apples', category: 1, value: 20, date: '2019-02-20', account: 1},
        {name: 'coffeedesk', category: 2, value: 10, date: '2019-02-10', account: 1},
        {name: 'rent', category: 3, value: 50, date: '2019-02-04', account: 1},
        {name: 'water', category: 4, value: 70, date: '2019-03-01', account: 2},
        {name: 'jeans', category: 5, value: 40, date: '2019-03-02', account: 1},
        {name: 'studies', category: 6, value: 50, date: '2019-03-10', account: 1},
        {name: 'badminton', category: 7, value: 40, date: '2019-03-17', account: 1},
        {name: 'b-day', category: 8, value: 60, date: '2019-03-21', account: 1},
        {name: 'bill', category: 9, value: 80, date: '2019-03-22', account: 1},
        {name: 'bus', category: 10, value: 90, date: '2019-03-23', account: 1},
        {name: 'cafe', category: 2, value: 89, date: '2019-03-27', account: 1}
    ],
    columns: [
        { key: 'name', name: 'Name', editable:true,resizable: true, sortable:true, type:'string' },
        { key: 'category', name: 'Category' , editable:true, resizable: true},
        { key: 'value', name: 'Value' , editable:true,resizable: true, sortable:true, type:'number'},
        { key: 'date', name: 'Date', editable:true,resizable: true},
        { key: 'account', name: 'Account', editable:true,resizable: true}
    ],
    filter: {
        startDate: '',
        endDate: '',
        account: ''
    }
}

const reducer = (state= initialState, action) => {
    return state;
}

export default reducer;