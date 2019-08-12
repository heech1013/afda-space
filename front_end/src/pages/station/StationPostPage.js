import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ForumTitleContainer from 'containers/forum/ForumTitleContainer';
import Writer from 'components/post/Writer';
import ForumCommentListContainer from 'containers/forum/ForumCommentListContainer';

const StationPostPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ForumTitleContainer
        type={'station'}
        id={id}/>
      <Writer theme={'post-writer'}/>
      <ForumCommentListContainer
        type={'station'}
        id={id}/>
    </PageTemplate>
  )
};

export default StationPostPage;