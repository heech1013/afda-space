import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ProfileCardContainer from 'containers/profile/ProfileCardContainer';
import MiniMenu from 'components/common/MiniMenu';
import PostListContainer from 'containers/post/PostListContainer';

const ProfilePage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <ProfileCardContainer
        updatable={true}/>
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <PostListContainer
        userId={id}/>
    </PageTemplate>
  )
}

export default ProfilePage;