// @flow
import { SET_CONFIG } from '../actions/config';
const storage = require('electron-json-storage');

type actionType = {
  type: string,
  data: any
};



export default function config(state: any = {}, action: actionType) {

  switch (action.type) {

    case SET_CONFIG:

      // save config state persistently
      storage.set("config", action.data, (err) => { if (err) { console.log(err) } })
      return action.data;

    default:
      return state;
  }
}
