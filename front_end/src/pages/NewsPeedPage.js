import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
// import Writer from 'components/common/Writer';
// import PostList from 'components/post/PostList';
// import PostListContainer from 'containers/post/PostListContainer';
import ActivityContainer from 'containers/post/ActivityContainer';

const NewsPeedPage = () => {
  return (
    <PageTemplate>
      <ActivityContainer
        type={'newspeed'}
      />
      {/* <Writer theme={'post-writer'}/> */}
      {/* <PostListContainer/> */}
    </PageTemplate>
  )
}

export default NewsPeedPage;