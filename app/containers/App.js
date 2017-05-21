// @flow
import React, { Component } from 'react';
import type { Children } from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {blueGrey400, lime400} from 'material-ui/styles/colors';

export default class App extends Component {

  muiTheme = getMuiTheme({
    palette: {
      primary1Color: blueGrey400,
      primary2Color: blueGrey400,
      primary3Color: blueGrey400,
      accent1Color: lime400,
    },
  }, {
    avatar: {
      borderColor: null,
    },
  });

  props: {
    children: Children
  };

  render() {
    return (
      <MuiThemeProvider muiTheme={this.muiTheme}>
        {this.props.children}
      </MuiThemeProvider>
    );
  }
}
