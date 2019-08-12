import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ProfileCardContainer from 'containers/profile/ProfileCardContainer';
import MiniMenu from 'components/common/MiniMenu';
import PostListContainer from 'containers/post/PostListContainer';
import ProfileUpdateModal from 'components/modal/ProfileUpdateModal';

const ProfilePage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <ProfileCardContainer
        userId={id}/>
      <MiniMenu 
        buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <PostListContainer
        userId={id}/>
      <ProfileUpdateModal
        visible={true}
        onCancel={() => {}}
        onSubmit={() => {}}
        error={null}/>
    </PageTemplate>
  )
}

export default ProfilePage;