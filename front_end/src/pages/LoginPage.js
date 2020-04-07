import React from 'react';

import LoginWrapper from 'components/auth/LoginWrapper';
import KakaoLogin from 'components/auth/KakaoLogin';
import LocalLoginContainer from 'containers/auth/LocalLoginContainer';

const LoginPage = () => {
  return (
    <LoginWrapper>
      <KakaoLogin/>
      <LocalLoginContainer/>
    </LoginWrapper>
  )
}

export default LoginPage;