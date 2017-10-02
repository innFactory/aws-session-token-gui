// @flow

type actionType = {
  type: string,
  token: any
};

export function accessToken(state: string = "", action: actionType) {
  switch (action.type) {
    case "SET_ACCESS_TOKEN":
      return action.token;
    default:
      return state;
  }
}

export function idToken(state: string = "", action: actionType) {
  switch (action.type) {
    case "SET_ID_TOKEN":
      return action.token;
    default:
      return state;
  }
}
