// @flow

type actionType = {
  type: string,
  token: any
};

export default function token(state: string = "", action: actionType) {
  switch (action.type) {
    case "SET_TOKEN":
      return action.token;
    default:
      return state;
  }
}
