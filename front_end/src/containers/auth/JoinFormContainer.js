import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base/base';

import JoinForm from 'components/auth/JoinForm';

class JoinFormContainer extends Component {
  handleNickChange = (e) => {
    const { value } = e.target;
    const { BaseActions } = this.props;
    BaseActions.changeNickInput(value);
  }
  handleAgeChange = (e) => {
    const { value } = e.target;
    const { BaseActions } = this.props;
    BaseActions.changeAgeInput(value);
  }
  handleSexChange = (e) => {
    const { value } = e.target;
    const { BaseActions } = this.props;
    BaseActions.changeSexInput(value);
  }
  handleJoin = async () => {
    const { BaseActions, auth, joinForm, history } = this.props;
    const { authId } = auth.toJS();
    const { nick, age, sex } = joinForm.toJS();
    try {
      await BaseActions.join(authId, nick, sex, age);
      const token = this.props.auth.toJS().token;
      localStorage.jwt = token;
      alert('성공적으로 회원가입이 완료되었습니다.');
      history.push('/');
    } catch (e) {}
  }
  render () {
    const { handleNickChange, handleAgeChange, handleSexChange, handleJoin } = this;
    const { joinForm } = this.props;
    const { nick, age, sex } = joinForm.toJS();
    return (
      <JoinForm
        onNickChange={handleNickChange} onAgeChange={handleAgeChange} onSexChange={handleSexChange} onJoin={handleJoin}
        nick={nick} age={age} selectedSex={sex}/>
    );
  }
}

export default connect(
  (state) => ({
    auth: state.base.get('auth'),
    joinForm: state.base.get('joinForm')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(JoinFormContainer));

