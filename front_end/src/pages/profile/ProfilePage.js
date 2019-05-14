import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ProfileCard from 'components/profile/ProfileCard';
import MiniMenu from 'components/common/MiniMenu';
import PostList from 'components/post/PostList';

const ProfilePage = () => {
  return (
    <PageTemplate>
      <ProfileCard
        updatable={true}
        nick={'우울한 청룡'}
        age={25}
        sex={'남자'}
        introduction={'안녕하세요. 주요 우울증과 사회 불안을 겪고 있는 우울한 청룡이입니다. 저는 이러쿵 저러쿵합니다. 그래서 이러쿵 저러쿵 했으면 좋겠습니다. 이러쿵 저러쿵 이러쿵..'}
      />
      <MiniMenu buttonArr={['프로필', '진단명', '증상', '처방약']}/>
      <PostList posts={
        [
          { id: 1,
            nick: '우울한 청룡',
            updatedAt: '2019-04-27 01:43:44',
            body: '테스트 포스트 내용 1. 이러쿵 저러쿵 테스트.',
            theme: 'support',
            checked: true,
            number: 9,
            onClick: () => console.log('onClick() is activated.'),
            comment: [
              {
                id: 1,
                nick: '뚜레쥬르',
                body: '이러쿵 저러쿵 하네요. 힘내세요!'
              },
              {
                id: 2,
                nick: '파리바게트',
                body: '이러쿵 저러쿵 하네요. 힘내세요!'
              },
              {
                id: 5,
                nick: '삼송빵집',
                body: '이러쿵 저러쿵 하네요. 힘내세요!'
              }
          ]
          },
          { id: 2,
            nick: '새벽의 이슬',
            updatedAt: '2019-04-27 01:44:34',
            body: '테스트 포스트 내용 2. 이러쿵 저러쿵 테스트.',
            theme: 'support',
            checked: false,
            number: 3,
            onClick: () => console.log('onClick() is activated.'),
            comment: [
              {
                id: 3,
                nick: '뚜레쥬르',
                body: '이러쿵 저러쿵 하네요. 힘내세요!'
              },
              {
                id: 4,
                nick: '파리바게트',
                body: '이러쿵 저러쿵 하네요. 힘내세요!'
              }
          ]
          }
        ]
      }/>
    </PageTemplate>
  )
}

export default ProfilePage;