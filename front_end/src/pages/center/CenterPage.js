import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ContentTitle from 'components/content/ContentTitle';
// import CenterListContainer from 'containers/center/CenterListContainer';
import ForumListContainer from 'containers/forum/ForumListContainer';

const CenterPage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        onClick={() => console.log('onClick() is activated.')}
        buttonString={'기관 추가하기'}/>
      <ForumListContainer
        type={'center'}/>
    </PageTemplate>
  )
}

export default CenterPage;