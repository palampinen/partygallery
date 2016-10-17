import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import App from './containers/App';
import reducer from './reducers/app';
import './index.css';

// create store and enable dev tools
const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware.apply(this, middlewares)(createStore);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>
	,
	document.getElementById('root')
);
