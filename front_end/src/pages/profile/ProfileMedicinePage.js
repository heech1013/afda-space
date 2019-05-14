import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ProfileContentList from 'components/profile/ProfileContentList';

const ProfileMedicinePage = () => {
  return (
    <PageTemplate>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ProfileContentList
        updatable={true}
        contents={[
          {
            id: 1,
            medicineName: '부프로피온',
            purposeOfPrescription: '주요 우을증',
            perceivedEffect: '보통',
            degreeOfSideEffect: '높음',
            symptomOfSideEffect: '식욕 부진'
          },
          {
            id: 2,
            medicineName: '부프로피온',
            purposeOfPrescription: '주요 우을증',
            perceivedEffect: '보통',
            degreeOfSideEffect: '높음',
            symptomOfSideEffect: '식욕 부진'
          },
          {
            id: 3,
            medicineName: '부프로피온',
            purposeOfPrescription: '주요 우을증',
            perceivedEffect: '보통',
            degreeOfSideEffect: '높음',
            symptomOfSideEffect: '식욕 부진'
          }
        ]}
      />
    </PageTemplate>
  )
};

export default ProfileMedicinePage;