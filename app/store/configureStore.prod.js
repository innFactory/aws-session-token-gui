// @flow
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
const storage = require('electron-json-storage');

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = applyMiddleware(thunk, router);

function _configureStore(initialState, callback) {
  let store = createStore(rootReducer, initialState, enhancer);
  callback(store);
}

function loadInitialState(callback) {
  storage.getMany(['config', 'user'], function (error, data) {
    if (error) { console.log(error) };
    if (data) {
      _configureStore(data, callback);
    }
  });
}

function configureStore(callback) {
  loadInitialState(callback);
}


export default { configureStore, history };
