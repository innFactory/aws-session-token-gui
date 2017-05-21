// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import config from './config';
import token from './token';
import user from './user';

const rootReducer = combineReducers({
  config,
  token,
  user,
  router,
});

export default rootReducer;
