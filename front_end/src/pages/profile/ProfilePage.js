import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ProfileCardContainer from 'containers/profile/ProfileCardContainer';
import MiniMenu from 'components/common/MiniMenu';
import ProfileSpecContainer from 'containers/profile/ProfileSpecContainer';
// import PostListContainer from 'containers/post/PostListContainer';
import ProfileUpdateModalContainer from 'containers/modal/ProfileUpdateModalContainer';

const ProfilePage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <MiniMenu 
        buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <ProfileCardContainer
        userId={id}/>
      <ProfileSpecContainer
        userId={id}/>
      {/* <PostListContainer
        userId={id}/> */}
      <ProfileUpdateModalContainer
        userId={id}/>
    </PageTemplate>
  )
}

export default ProfilePage;