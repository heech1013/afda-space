import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import Writer from 'components/post/Writer';
// import PostList from 'components/post/PostList';
import PostListContainer from 'containers/post/PostListContainer';

const NewsPeedPage = () => {
  return (
    <PageTemplate>
      <Writer theme={'post-writer'}/>
      <PostListContainer/>
    </PageTemplate>
  )
}

export default NewsPeedPage;