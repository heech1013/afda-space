import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitle from 'components/content/ContentTitle';
import ContentList from 'components/content/ContentList';
import MiniMenu from 'components/common/MiniMenu';

const DiagnosisMedicinePage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        nameKr={"주요 우울증"}
        nameEn={"Major Depressive Disorder"}
        onClick={() => console.log('addToMyProfile')}
        buttonString={"내 프로필에 추가"}
      />
      <ContentList
        row_1={'처방약'}
        row_2={'사람 수'}
        to={'medicine'}
        contents={[
          {
            id: 1,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 2,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 3,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 4,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 5,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 6,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 7,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 8,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          },
          {
            id: 9,
            title: '부프로피온',
            enTitle: 'Bupropion',
            number: 64
          }
        ]}
        />
      <MiniMenu buttonArr={["개요", "증상명", "처방약", "뉴스피드"]}/>
    </PageTemplate>

  );
}

export default DiagnosisMedicinePage;