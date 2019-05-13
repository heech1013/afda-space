import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentList from 'components/content/ContentList';

const MedicinePage = () => {
  return (
    <PageTemplate>
      <ContentList
        row_1={'처방약'}
        row_2={'평가 수'}
        to={'medicine'}
        contents={[
          {
            id: 1,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '63'
          },
          {
            id: 2,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '103'
          },
          {
            id: 3,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '63'
          },
          {
            id: 4,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '103'
          },
          {
            id: 5,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '63'
          },
          {
            id: 6,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '103'
          },
          {
            id: 7,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '63'
          },
          {
            id: 8,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '103'
          },
          {
            id: 9,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '63'
          },
          {
            id: 10,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '103'
          },
          {
            id: 11,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '63'
          },
          {
            id: 12,
            title: '부프로피온',
            enTitle: 'Buropion',
            number: '103'
          }
        ]}
      />
    </PageTemplate>
  )
}

export default MedicinePage;