import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base/base';

import JoinForm from 'components/auth/JoinForm';

class JoinFormContainer extends Component {
  handleJoin = async ({ state }) => {
    const { BaseActions, auth, history } = this.props;
    const { authId, token } = auth.toJS();
    const { nick, birthDate, sex } = state;
    try {
      await BaseActions.join(authId, nick, sex, birthDate);
      localStorage.jwt = token;
      alert('성공적으로 회원가입이 완료되었습니다.');
      history.push('/');
    } catch (e) {}
  }
  render () {
    const { handleJoin } = this;
    return (
      <JoinForm
        onJoin={handleJoin}
      />
    );
  }
}

export default connect(
  (state) => ({
    auth: state.base.get('auth')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(JoinFormContainer));

