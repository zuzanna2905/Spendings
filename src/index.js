import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'tachyons';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import profileReducer from './store/reducers/profile';
import spendingsReducer from './store/reducers/spendings';
import reportsReducer from './store/reducers/reports';
import sessionsReducer from './store/reducers/session';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    prof: profileReducer,
    spend: spendingsReducer,
    repo: reportsReducer,
    sess: sessionsReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(<Provider store={store}> <App /> </Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
