import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import CenterListContainer from 'containers/center/CenterListContainer';
import ContentTitle from 'components/content/ContentTitle';

const CenterPage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        onClick={() => console.log('onClick() is activated.')}
        buttonString={'기관 추가하기'}/>
      <CenterListContainer/>
    </PageTemplate>
  )
}

export default CenterPage;