import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import Writer from 'components/common/Writer';
import PostList from 'components/common/PostList';

const NewsPeedPage = () => {
  return (
    <PageTemplate>
      <Writer/>
      <PostList posts={
        [
          { nick: '우울한 청룡',
            updatedAt: '2019-04-27 01:43:44',
            body: '테스트 포스트 내용 1. 이러쿵 저러쿵 테스트.'
          },
          { nick: '새벽의 이슬',
            updatedAt: '2019-04-27 01:44:34',
            body: '테스트 포스트 내용 2. 이러쿵 저러쿵 테스트.'
          }
        ]
      }/>
    </PageTemplate>
  )
}

export default NewsPeedPage;