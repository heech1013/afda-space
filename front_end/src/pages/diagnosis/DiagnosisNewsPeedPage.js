import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
// import ContentTitle from 'components/content/ContentTitle';
import MiniMenu from 'components/common/MiniMenu';
// import PostList from 'components/post/PostList';
import CloseNotice from 'components/common/CloseNotice';

const DiagnosisNewspeedPage = () => {
  return (
    <PageTemplate>
      <CloseNotice/>
      {/* <ContentTitle
        nameKr={"주요 우울증"}
        nameEn={"Major Depressive Disorder"}
        onClick={() => console.log('addToMyProfile')}
        buttonString={"내 프로필에 추가"}
      />
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
      }/> */}
      <MiniMenu buttonArr={["개요", "증상", "처방약", "뉴스피드"]}/>
    </PageTemplate>

  );
}

export default DiagnosisNewspeedPage;