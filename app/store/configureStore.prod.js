// @flow
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from '../reducers';
import { localStorage } from 'react';
import {
  persistStore,
  autoRehydrate,
} from 'redux-persist';

const persistBlacklist = ["token", "router"];

const history = createBrowserHistory();
const router = routerMiddleware(history);
const enhancer = compose(applyMiddleware(thunk, router), autoRehydrate());

function configureStore(callback: () => {}) {
  let store = createStore(rootReducer, {}, enhancer);
  persistStore(store, { storage: localStorage, blacklist: persistBlacklist }, callback);
  return store;
}

export default { configureStore, history };
