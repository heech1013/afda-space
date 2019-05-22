import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ContentTitle from 'components/content/ContentTitle';
import StationListContainer from 'containers/station/StationListContainer';

const StationPage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        onClick={() => console.log('onClick() is activated.')}
        buttonString={'주제 등록하기'}/>
      <StationListContainer/>
    </PageTemplate>
  )
}

export default StationPage;