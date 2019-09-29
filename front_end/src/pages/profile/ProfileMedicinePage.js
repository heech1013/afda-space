import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ProfileContentListContainer from 'containers/profile/ProfileContentListContainer';

const ProfileMedicinePage = () => {
  return (
    <PageTemplate>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ProfileContentListContainer/>
    </PageTemplate>
  )
};

export default ProfileMedicinePage;