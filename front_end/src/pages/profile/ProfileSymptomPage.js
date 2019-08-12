import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ProfileContentList from 'components/profile/ProfileContentList';

const ProfileSymptomPage = () => {
  return (
    <PageTemplate>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ProfileContentList
        updatable={true}
        contents={[
          {
            id: 1,
            symptomName: "식욕 부진"
          },
          {
            id: 2,
            symptomName: "식욕 부진"
          },
          {
            id: 3,
            symptomName: "식욕 부진"
          }
        ]}
      />
    </PageTemplate>
  )
};

export default ProfileSymptomPage;