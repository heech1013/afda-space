import React, { Component } from 'react';
import classNames from 'classnames/bind';
import styles from './KakaoLogin.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import * as baseActions from 'store/modules/base/base';
import dotenv from 'dotenv';

const cx = classNames.bind(styles);
dotenv.config();

class KakaoLogin extends Component {

  loginOrJoin = async (authId) => {
    const { BaseActions, history } = this.props;
    await BaseActions.login('KAKAO', authId, null);
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
    /** public/index.html 내부 <script> 태그 내에서 kakao cdn 로드. window 전역 객체를 통해 Kakao 객체에 접근할 수 있다. */
    window.Kakao.cleanup();  // kakao.init을 두 번 이상 실행(로그인 페이지에 두 번 이상 접속)하면 에러가 나기 때문에, init하기 전 sdk 리소스를 비워준다.
    window.Kakao.init(process.env.REACT_APP_KAKAO_APP_KEY);
    window.Kakao.Auth.createLoginButton({
      container: '#kakao-login-btn',
      success: (authObj) => {  // 사용자가 성공적으로 카카오 로그인을 진행하였을 경우. 자동으로 access_token을 사용하여 Kakao.API를 사용할 수 있게 된다.
        window.Kakao.API.request({
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
        console.log(err);
        alert('로그인에 실패하였습니다. 다시 시도해주세요.');
        history.push('/');
      }
    })
  }

  render() {
    return (
      <div>
        <div className={cx('kakao-login')}>
          <div id="kakao-login-btn">{""}</div>
          {/* <a id="kakao-login-btn" href={'/'}>{''}</a> warning 방지를 위해 href와 children에 임시값을 넣어놓았다 */}
        </div>
        <p className={cx('text')}>아픔모아는 이용자 식별을 위해 카카오톡 측에서 제공하는 고유식별 ID만을 활용합니다. 카카오톡에서 [필수] 항목으로 지정한 '프로필 정보(닉네임/프로필 사진)'은 아픔모아 내에서 어떠한 형식으로든 활용되거나 보여지지 않음을 밝힙니다.</p>
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