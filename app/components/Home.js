// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';
const {shell} = require('electron')


// provide touch events (for menu)
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import { Grid, Flex, Box } from 'reflexbox'


export default class Home extends Component {

  props: {
    cognitoLogin: () => void,
    setConfig: () => void,
    token: string,
    user: any,
    config: any,
  };

  constructor(props) {
    super();


    this.state = {
      userPoolId: props.config.userPoolId,
      clientId: props.config.clientId,
      userName: props.user.userName,
      password: props.user.password,
      rememberPassword: props.user.rememberPassword,
    };
  }


  render() {
    return (
      <div>
        <AppBar
          title="Get AWS Access Token"
          iconElementLeft={<div></div>}
          iconElementRight={(
            <IconMenu
              {...this.props}
              iconButtonElement={
                <IconButton><MoreVertIcon /></IconButton>
              }
              targetOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              <MenuItem primaryText="GitHub" onClick={()=>{shell.openExternal("https://github.com/innFactory/aws-session-token-gui")}} />
                <MenuItem primaryText="innFactory" onClick={()=>{shell.openExternal("https://www.innFactory.de")}}/>
            </IconMenu>
          )}
        />
        <div className={styles.container} data-tid="container">

          <Flex p={2} ml={2} flexColumn={false}>
            <Flex p={2} ml={2} flexColumn>
              <Box col={6}>
                <TextField
                  value={this.state.userPoolId}
                  floatingLabelText="User Pool ID"
                  hintText="e.g: eu-central-1_tz1GHkOqq"
                  onChange={(e, text) => { this.setState({ userPoolId: text }, this._onConfigChanged) }}
                />
                <TextField
                  value={this.state.clientId}
                  floatingLabelText="Client ID"
                  hintText="e.g: k16j2w4h05p89iuyy7d655ce1"
                  onChange={(e, text) => { this.setState({ clientId: text }, this._onConfigChanged) }}
                />
                <TextField
                  value={this.state.userName}
                  floatingLabelText="User Name"
                  hintText="User Name"
                  onChange={(e, text) => { this.setState({ userName: text }) }}
                />
                <TextField
                  value={this.state.password}
                  floatingLabelText="Password"
                  hintText="Password"
                  type="password"
                  onChange={(e, text) => { this.setState({ password: text }) }}
                />
                <Toggle
                  label="Remember Password (unsafe)"
                  defaultToggled={this.state.rememberPassword}
                  onToggle={(e, bool) => { this.setState({ rememberPassword: bool }) }}
                  labelStyle={{ fontSize: 13, color: "darkgrey" }}
                  style={{ minWidth: 256, maxWidth: 256 }}
                />
              </Box>
              <Box col={6} mt={2}>
                <RaisedButton label="Get Token" secondary onClick={this._onGetToken.bind(this)} />
              </Box>
            </Flex>
            <Box col={7}>
              <div>
                {this.props.token}
              </div>
            </Box>
          </Flex>

        </div>
      </div>
    );
  }


  _onGetToken() {

    this.props.cognitoLogin({
      userName: this.state.userName,
      password: this.state.password,
      rememberPassword: this.state.rememberPassword
    });
  }

  _onConfigChanged() {
    this.props.setConfig({ userPoolId: this.state.userPoolId, clientId: this.state.clientId });
  }

}
