// @flow
import { SET_USER } from '../actions/user';
const storage = require('electron-json-storage');

type actionType = {
  type: string,
  data: any,
};

export default function user(state: any = {}, action: actionType) {
  switch (action.type) {
    case SET_USER:

      if (!action.data.rememberPassword) {
        delete action.data["password"];
      }

      // save user state persistently
      storage.set("user", action.data, (err) => { if (err) { console.log(err) } })
      return action.data

    default:
      return state;
  }
}

