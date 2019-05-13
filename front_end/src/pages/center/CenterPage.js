import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ForumContentList from 'components/forum/ForumContentList';
import ContentTitle from 'components/content/ContentTitle';

const CenterPage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        onClick={() => console.log('onClick() is activated.')}
        buttonString={'기관 추가하기'}/>
      <ForumContentList
        contents={[
          {
            id: 1,
            area: '서울시 동작구',
            centerName: '동작심리상담센터',
            doctorName: '신희창',
            evalCount: 12
          },
          {
            id: 2,
            area: '서울시 동작구',
            centerName: '동작심리상담센터',
            doctorName: '신희창',
            evalCount: 12
          },
          {
            id: 3,
            area: '서울시 동작구',
            centerName: '동작심리상담센터',
            doctorName: '신희창',
            evalCount: 12
          },
          {
            id: 4,
            area: '서울시 동작구',
            centerName: '동작심리상담센터',
            doctorName: '신희창',
            evalCount: 12
          },
          {
            id: 5,
            area: '서울시 동작구',
            centerName: '동작심리상담센터',
            doctorName: '신희창',
            evalCount: 12
          },
          {
            id: 6,
            area: '서울시 동작구',
            centerName: '동작심리상담센터',
            doctorName: '신희창',
            evalCount: 12
          },
          {
            id: 7,
            area: '서울시 동작구',
            centerName: '동작심리상담센터',
            doctorName: '신희창',
            evalCount: 12
          }
        ]}
      />
    </PageTemplate>
  )
}

export default CenterPage;