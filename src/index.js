import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import ReactDOM from 'react-dom';
import App from './containers/App';
import ImageView from './containers/Images';
import ChatView from './containers/Chat';

import * as reducers from './reducers';
import './index.css';
import {
  BrowserRouter as Router,
  IndexRoute,
  Route
} from 'react-router-dom'

// create store and enable dev tools
const middlewares = [thunk];
const createStoreWithMiddleware = applyMiddleware.apply(this, middlewares)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

ReactDOM.render(
	<Provider store={store}>
		 <Router>
			<App>
		    <Route exact path="/" component={ImageView} />
		    <Route path="/chat" component={ChatView} />
	  	</App>
		</Router>
	</Provider>
	,
	document.getElementById('root')
);
