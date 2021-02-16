import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base';

import JoinForm from 'components/auth/JoinForm';

class JoinFormContainer extends Component {
  
  handleJoin = async ({ state }) => {
    const { BaseActions, joinType, auth, history } = this.props;
    const { authId, token } = auth.toJS();
    const { email, password, nick, birthDate, sex } = state;
    
    if (joinType === 'LOCAL') await BaseActions.join(joinType, email, password, nick, sex, birthDate);
    else if (joinType === 'KAKAO') await BaseActions.join(joinType, authId, null, nick, sex, birthDate);
    localStorage.jwt = token;
    alert('성공적으로 회원가입이 완료되었습니다.');
    history.push('/');
  }

  render () {
    const { handleJoin } = this;
    /** joinType: KAKAO / LOCAL(default)
     * 카카오 로그인 -> login.js(type='LOCAL') -> 존재하지 않는 authId일 경우 state.base.joinType을 'KAKAO'로 설정한 후 history.push('/join')
     * 위 프로세스를 거치지 않을 경우 LOCAL(default)
     */
    const { joinType, error } = this.props;
    return (
      <JoinForm
        joinType={joinType}
        onJoin={handleJoin}
        error={error}
      />
    );
  }
}

export default connect(
  (state) => ({
    joinType: state.base.get('joinType'),
    auth: state.base.get('auth'),
    error: state.base.getIn(['error', 'join'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(JoinFormContainer));

