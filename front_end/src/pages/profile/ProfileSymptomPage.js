import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ProfileContentListContainer from 'containers/profile/ProfileContentListContainer';

const ProfileSymptomPage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ProfileContentListContainer
        type={'symptom'}
        userId={id} />
    </PageTemplate>
  )
};

export default ProfileSymptomPage;