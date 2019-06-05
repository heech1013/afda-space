import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ForumTitleContainer from 'containers/forum/ForumTitleContainer';
import Writer from 'components/post/Writer';
import ForumCommentList from 'components/forum/ForumCommentList';

const StationPostPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ForumTitleContainer
        type={'station'}
        id={id}/>
      <Writer theme={'post-writer'}/>
      <ForumCommentList
        row={'답변'}
        comments={[
          {
            id: 1,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          },
          {
            id: 2,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          },
          {
            id: 3,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          },
          {
            id: 4,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          },
          {
            id: 5,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          },
          {
            id: 6,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          },
          {
            id: 7,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          },
          {
            id: 8,
            nick: '우울한 청룡',
            updatedAt: '2019-05-11 21:06:00',
            body: '이러쿵 저러쿵해서 좋았어요. 근데 이러쿵 저러쿵한 건 별로더군요. 그래도 이러쿵 저러쿵해서 이러쿵 저러쿵 했답니다. 이러쿵 저러쿵하면 될 것 같네요.'
          }
        ]}/>
    </PageTemplate>
  )
};

export default StationPostPage;