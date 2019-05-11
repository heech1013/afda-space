import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ForumTitle from 'components/common/ForumTitle';
import Writer from 'components/common/Writer';
import ForumCommentList from 'components/common/ForumCommentList';

const StationPostPage = () => {
  return (
    <PageTemplate>
      <ForumTitle
        subject={'새로 가입하셨나요? 여러분을 소개해주세요!'}
        body={'이 곳에 소개를 적어주시면, 여러분이 왔다는 사실을 모두가 알 수 있어요! 이러쿵 저러쿵해서 이러쿵 저러쿵해요. 이러쿵 저러쿵해서 이러쿵 저러쿵 해봐요!'}
        enroller={'우울한 청룡'}/>
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