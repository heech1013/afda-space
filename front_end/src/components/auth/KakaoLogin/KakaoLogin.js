import Kakao from 'kakaojs';
import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './KakaoLogin.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base/base';

const cx = classNames.bind(styles);

class KakaoLogin extends Component {

  loginOrJoin = async (authId) => {
    const { BaseActions, history } = this.props;
    await BaseActions.login(authId);
    const { logged, auth } = this.props;
    const { token } = auth.toJS();
    /* 회원가입 */
    if (!logged) history.push('/join');
    /* 로그인(토큰 발행) */
    else if (logged) {
      localStorage.jwt = token;
      history.push('/');
    }
  }
  
  componentDidMount() {
    const { history } = this.props;
    Kakao.cleanup();  // kakao.init을 두 번 이상 실행(로그인 페이지에 두 번 이상 접속)하면 에러가 나기 때문에, init하기 전 sdk 리소스를 비워준다.
    Kakao.init('2ef83b139c92fbb8798d07febee20bbf');
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: (authObj) => {  // 사용자가 성공적으로 카카오 로그인을 진행하였을 경우. 자동으로 access_token을 사용하여 Kakao.API를 사용할 수 있게 된다.
        Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            this.loginOrJoin(res.id);
          },
          fail: function(err) {
            alert('로그인에 실패하였습니다. 다시 시도해주세요.');
            history.push('/');
          }
        })
      },
      fail: function(err) {
        alert('로그인에 실패하였습니다. 다시 시도해주세요.');
        history.push('/');
      }
    })
  }

  render() {
    return (
      <div className={cx('kakao-login')}>
        <div id="kakao-login-btn">{""}</div>
        {/* <a id="kakao-login-btn" href={'/'}>{''}</a> warning 방지를 위해 href와 children에 임시값을 넣어놓았다 */}
      </div>
    );
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    auth: state.base.get('auth')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(withRouter(KakaoLogin));