import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ForumTitleContainer from 'containers/forum/ForumTitleContainer';
import Writer from 'components/common/Writer';
import ForumCommentListContainer from 'containers/forum/ForumCommentListContainer';

const StationPostPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ForumTitleContainer
        type={'station'}
        id={id}/>
      {/* <ForumCommentListContainer
        type={'station'}
        id={id}/> */}
      <Writer theme={'post-writer'}/>
    </PageTemplate>
  )
};

export default StationPostPage;