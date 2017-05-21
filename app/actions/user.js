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
            // if login failed: check if user should be created, otherwise show an error message
                // handle error
                let message = "Login war nicht erfolgreich!";
                if (err.code=="UserNotFoundException" || err.code=="NotAuthorizedException") {
                    message = "E-Mail oder Passwort falsch!"
                }
                console.log(message);
                //dispatch({type: types.SET_ERROR, message: message});
        },
    });
}
