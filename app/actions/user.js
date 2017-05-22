/**
 * Created by toni on 11.05.2017.
 */
import {Config, CognitoIdentityCredentials} from "aws-sdk";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails
} from "amazon-cognito-identity-js";


export const LOGIN = 'LOGIN';
export const SET_USER = "SET_USER";

export function cognitoLogin(user) {
    return (dispatch, getState) =>_cognitoLogin(user, dispatch, getState);
}

/**
 * Login to AWS Cognito
 *
 * @param userName
 * @param password
 * @param dispatch
 * @private
 */
function _cognitoLogin(user, dispatch, getState) {
    let {config} = getState();
  dispatch({type: SET_USER, data: {...user}});

  const authenticationData = {
        Username: user.userName,
        Password: user.password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
        UserPoolId: config.userPoolId,
        ClientId: config.clientId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
        Username: user.userName,
        Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
            // login was successful: store aws idToken to state
            dispatch({type: "SET_TOKEN", token: result.getIdToken().getJwtToken()});
        },
        onFailure: (err) => {
             // login failed: set error as token to display it
            dispatch({type: "SET_TOKEN", token: JSON.stringify(err)});
        },
    });
}
