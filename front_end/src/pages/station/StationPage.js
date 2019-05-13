import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ContentTitle from 'components/content/ContentTitle';
import ForumContentList from 'components/forum/ForumContentList';

const StationPage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        onClick={() => console.log('onClick() is activated.')}
        buttonString={'주제 등록하기'}/>
      <ForumContentList
        contents={[
          {
            id: 1,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          },
          {
            id: 2,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          },
          {
            id: 3,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          },
          {
            id: 4,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          },
          {
            id: 5,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          },
          {
            id: 6,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          },
          {
            id: 7,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          },
          {
            id: 8,
            subject: '새로 가입하셨나요? 당신을 소개해주세요!',
            helpfulCount: 24,
            answerCount: 102
          }
        ]}
      />
    </PageTemplate>
  )
}

export default StationPage;