// @flow
import { SET_CONFIG } from '../actions/config';


type actionType = {
  type: string,
  data: any
};

export default function config(state: any = {}, action: actionType) {
  switch (action.type) {
    case SET_CONFIG:
      return action.data;
    default:
      return state;
  }
}
