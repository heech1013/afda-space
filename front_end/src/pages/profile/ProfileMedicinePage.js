import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MiniMenu from 'components/common/MiniMenu';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
import ProfileContentListContainer from 'containers/profile/ProfileContentListContainer';
import ProfileMedicineAddModalContainer from 'containers/modal/ProfileMedicineAddModalContainer';
import ProfileMedicineDosageAddModalContainer from 'containers/modal/ProfileMedicineDosageAddModalContainer';
import ProfileMedicinePurposeAddModalContainer from 'containers/modal/ProfileMedicinePurposeAddModalContainer';
import ProfileMedicineEvaluationAddModalContainer from 'containers/modal/ProfileMedicineEvaluationAddModalContainer';

const ProfileMedicinePage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <MiniMenu
        buttonArr={['프로필', '진단명', '증상', '처방약']} />
      <ContentTitleContainer
        buttonString={"새 처방약 추가"} />
      <ProfileContentListContainer
        type={'medicine'}
        userId={id} />
      <ProfileMedicineAddModalContainer
        userId={id} />
      <ProfileMedicineDosageAddModalContainer 
        userId={id} />
      <ProfileMedicinePurposeAddModalContainer 
        userId={id} />
      <ProfileMedicineEvaluationAddModalContainer 
        userId={id} />
    </PageTemplate>
  )
};

export default ProfileMedicinePage;