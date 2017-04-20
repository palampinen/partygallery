import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import App from './containers/App';
import * as reducers from './reducers';
import './index.css';

// create store and enable dev tools
const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware.apply(this, middlewares)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	,
	document.getElementById('root')
);
