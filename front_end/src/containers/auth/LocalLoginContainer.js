import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';

import LocalLogin from 'components/auth/LocalLogin';

class LocalLoginContainer extends Component {

  handleLogin = async(authId, password) => {
    const { BaseActions, history } = this.props;
    await BaseActions.login('LOCAL', authId, password);
    /** login.js 실행 후 결과를 반영하기 위해 login action 이후 props를 새로 받는다. */
    const { logged, auth } = this.props;
    const { token } = auth.toJS();
    if (logged) {    
      localStorage.jwt = token;
      history.push('/');
    }
  }

  render() {
    const { handleLogin } = this;
    const { error } = this.props;
    return (
      <LocalLogin
        onLogin={handleLogin}
        error={error}
      />
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    auth: state.base.get('auth'),
    error: state.base.getIn(['error', 'login'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(LocalLoginContainer));