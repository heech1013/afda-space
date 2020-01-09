import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
import ProfileContentListContainer from 'containers/profile/ProfileContentListContainer';
import ProfileSymptomAddModalContainer from 'containers/modal/ProfileSymptomAddModalContainer';

const ProfileSymptomPage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ContentTitleContainer
        buttonString={"새 증상 추가"}/>
      <ProfileContentListContainer
        type={'symptom'}
        userId={id} />
      <ProfileSymptomAddModalContainer 
        userId={id} />
    </PageTemplate>
  )
};

export default ProfileSymptomPage;