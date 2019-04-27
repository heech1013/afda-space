import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import Writer from 'components/common/Writer';
import PostList from 'components/common/PostList';

const NewsPeedPage = () => {
  return (
    <PageTemplate>
      <Writer theme={'post-writer'}/>
      <PostList posts={
        [
          { id: 1,
            nick: '우울한 청룡',
            updatedAt: '2019-04-27 01:43:44',
            body: '테스트 포스트 내용 1. 이러쿵 저러쿵 테스트.',
            support: 5,
            checked: true,
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
            support: 1,
            checked: false,
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

export default NewsPeedPage;