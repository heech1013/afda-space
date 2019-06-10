import React from 'react';

import LoginWrapper from 'components/auth/LoginWrapper';
import KakaoLogin from 'components/auth/KakaoLogin';

const LoginPage = () => {
  return (
    <LoginWrapper>
      <KakaoLogin/>
    </LoginWrapper>
  )
}

export default LoginPage;