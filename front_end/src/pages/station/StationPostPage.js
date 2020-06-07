import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ForumTitleContainer from 'containers/forum/ForumTitleContainer';
import ForumCommentListContainer from 'containers/forum/ForumCommentListContainer';
import WriterContainer from 'containers/common/WriterContainer';

const StationPostPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ForumTitleContainer
        type={'station'}
        id={id}/>
      <ForumCommentListContainer
        type={'station'}
        id={id}/>
      <WriterContainer
        type={'station'}
        id={id}/>
    </PageTemplate>
  )
};

export default StationPostPage;