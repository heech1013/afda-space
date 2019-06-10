import React from 'react';

import LoginWrapper from 'components/auth/LoginWrapper';
import JoinFormContainer from 'containers/auth/JoinFormContainer';

const JoinPage = () => {
  return (
    <LoginWrapper>
      <JoinFormContainer/>
    </LoginWrapper>
  )
}

export default JoinPage;