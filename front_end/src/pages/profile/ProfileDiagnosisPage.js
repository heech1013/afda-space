import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
import ProfileContentListContainer from 'containers/profile/ProfileContentListContainer';
import ProfileDiagnosisAddModalContainer from 'containers/modal/ProfileDiagnosisAddModalContainer';
import ProfileCard from '../../components/profile/ProfileCard/ProfileCard';

const ProfileDiagnosisPage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ContentTitleContainer
        buttonString={"새 진단명 추가"}/>
      <ProfileContentListContainer
        type={'diagnosis'}
        userId={id}/>
      <ProfileDiagnosisAddModalContainer
        // userId={id}
      />
    </PageTemplate>
  )
};

export default ProfileDiagnosisPage;