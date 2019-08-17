import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ProfileContentListContainer from 'container/profile/ProfileContentListContainer';

const ProfileDiagnosisPage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ProfileContentListContainer
        userId={id}/>
      {/* <ProfileContentList
        updatable={true}
        contents={[
          {
            id: 1,
            diagnosisName: "주요 우울증",
            ageAtFirstSymptom: "20 ~ 29세",
            periodOfSymptom: "1 ~ 12개월"
          },
          {
            id: 2,
            diagnosisName: "주요 우울증",
            ageAtFirstSymptom: "20 ~ 29세",
            periodOfSymptom: "1 ~ 12개월"
          },
          {
            id: 3,
            diagnosisName: "주요 우울증",
            ageAtFirstSymptom: "20 ~ 29세",
            periodOfSymptom: "1 ~ 12개월"
          }
        ]}
      /> */}
    </PageTemplate>
  )
};

export default ProfileDiagnosisPage;