// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import config from './config';
import {idToken, accessToken} from './token';
import user from './user';

const rootReducer = combineReducers({
  config,
  idToken,
  accessToken,
  user,
  router,
});

export default rootReducer;
