import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ProfileCard from 'components/profile/ProfileCard';
import MiniMenu from 'components/common/MiniMenu';

const ProfilePage = () => {
  return (
    <PageTemplate>
      <ProfileCard
        nick={'우울한 청룡'}
        age={25}
        sex={'남자'}
        introduction={'안녕하세요. 주요 우울증과 사회 불안을 겪고 있는 우울한 청룡이입니다. 저는 이러쿵 저러쿵합니다. 그래서 이러쿵 저러쿵 했으면 좋겠습니다. 이러쿵 저러쿵 이러쿵..'}
      />
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
    </PageTemplate>
  )
}

export default ProfilePage;