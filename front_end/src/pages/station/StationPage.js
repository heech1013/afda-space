import React from 'react';
import PageTemplate from 'components/common/PageTemplate';
import ForumListContainer from 'containers/forum/ForumListContainer';
import StationAddModalContainer from 'containers/modal/StationAddModalContainer';

const StationPage = () => {
  return (
    <PageTemplate>
      <ForumListContainer
        type={'station'}/>
      <StationAddModalContainer/>
    </PageTemplate>
  )
}

export default StationPage;