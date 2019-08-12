import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ForumTitleContainer from 'containers/forum/ForumTitleContainer';
import Writer from 'components/post/Writer';
import ForumCommentListContainer from 'containers/forum/ForumCommentListContainer';

const CenterPostPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ForumTitleContainer
        type={'center'}
        id={id}/>
      <Writer theme={'post-writer'}/>
      <ForumCommentListContainer
        type={'center'}
        id={id}/>
    </PageTemplate>
  )
};

export default CenterPostPage;