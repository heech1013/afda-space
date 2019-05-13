import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentList from 'components/content/ContentList';

const DiagnosisPage = () => {
  return (
    <PageTemplate>
      <ContentList
        row_1={'진단명'}
        row_2={'사람 수'}
        to={'diagnosis'}
        contents={[
          {
            id: 1,
            title: '주요 우울증',
            enTitle: 'Major Depressive Disorder',
            number: '63'
          },
          {
            id: 2,
            title: '불안 장애',
            enTitle: 'Anxiety Disorder',
            number: '103'
          },
          {
            id: 3,
            title: '주요 우울증',
            enTitle: 'Major Depressive Disorder',
            number: '63'
          },
          {
            id: 4,
            title: '불안 장애',
            enTitle: 'Anxiety Disorder',
            number: '103'
          },
          {
            id: 5,
            title: '주요 우울증',
            enTitle: 'Major Depressive Disorder',
            number: '63'
          },
          {
            id: 6,
            title: '불안 장애',
            enTitle: 'Anxiety Disorder',
            number: '103'
          },
          {
            id: 7,
            title: '주요 우울증',
            enTitle: 'Major Depressive Disorder',
            number: '63'
          },
          {
            id: 8,
            title: '불안 장애',
            enTitle: 'Anxiety Disorder',
            number: '103'
          },
          {
            id: 9,
            title: '주요 우울증',
            enTitle: 'Major Depressive Disorder',
            number: '63'
          },
          {
            id: 10,
            title: '불안 장애',
            enTitle: 'Anxiety Disorder',
            number: '103'
          },
          {
            id: 11,
            title: '주요 우울증',
            enTitle: 'Major Depressive Disorder',
            number: '63'
          },
          {
            id: 12,
            title: '불안 장애',
            enTitle: 'Anxiety Disorder',
            number: '103'
          }
        ]}
      />
    </PageTemplate>
  )
}

export default DiagnosisPage;