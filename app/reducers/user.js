// @flow
import { SET_USER } from '../actions/user';

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

      return action.data
    default:
      return state;
  }
}

