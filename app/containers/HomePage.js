// @flow
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import Home from '../components/Home';

import { connect } from 'react-redux';
import * as UserActions from '../actions/user';
import * as ConfigActions from '../actions/config';



function mapStateToProps(state) {
  return {
    token: state.token,
    user: state.user,
    config: state.config,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({...UserActions, ...ConfigActions}, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);

