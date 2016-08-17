import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import App from './containers/App';
import reducer from './reducers/app';
import './index.css';

// create store and enable dev tools
const store = createStore(reducer, window.devToolsExtension && window.devToolsExtension());

ReactDOM.render(
	<Provider store={store}>
  	<App />
  </Provider>
  ,
  document.getElementById('root')
);
