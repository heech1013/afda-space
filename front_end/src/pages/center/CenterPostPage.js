import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ForumTitle from 'components/common/ForumTitle';
import Writer from 'components/common/Writer';

const CenterPostPage = () => {
  return (
    <PageTemplate>
      <ForumTitle
        area={'서울시 동작구'}
        centerName={'동작구 심리상담센터'}
        doctorName={'신희창'}
        enroller={'우울한 청룡'}/>
      <Writer theme={'post-writer'}/>
    </PageTemplate>
  )
};

export default CenterPostPage;