import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ProfileCardContainer from 'containers/profile/ProfileCardContainer';
import MiniMenuContainer from 'containers/common/MiniMenuContainer';
import ProfileSpecContainer from 'containers/profile/ProfileSpecContainer';
// import NewspeedContainer from 'containers/post/NewspeedContainer';
import ProfileUpdateModalContainer from 'containers/modal/ProfileUpdateModalContainer';

const ProfilePage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <MiniMenuContainer 
        userId={id}/>
      <ProfileCardContainer
        userId={id}/>
      <ProfileSpecContainer
        userId={id}/>
      <ProfileUpdateModalContainer
        userId={id}/>
    </PageTemplate>
  )
}

export default ProfilePage;