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
  componentDidMount() {
    const { BaseActions, history } = this.props;
    Kakao.init('72c76b14bb8ff423398a0e9ccee18b91');
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: (authObj) => {
        Kakao.API.request({
          url: '/v1/user/me',
          success: (res) => {
            BaseActions.login(res.id);
          },
          fail: function(err) {
            alert('로그인에 실패하였습니다. 다시 시도해주세요.');
            history.push('/');
          }
        }).then(() => {
          const { auth } = this.props;
          const { join, token } = auth.toJS();
          /* 회원가입 */
          if (!join) history.push('/join');
          /* 로그인(토큰 발행) */
          else if (join) {
            localStorage.jwt = token;
            history.push('/');
          }
        });

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
        <a id="kakao-login-btn" href={'/'}>{''}</a> {/* warning 방지를 위해 href와 children에 임시값을 넣어놓았다 */}
      </div>
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
)(withRouter(KakaoLogin));