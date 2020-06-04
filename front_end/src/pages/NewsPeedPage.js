import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import NewspeedContainer from 'containers/post/NewspeedContainer';

const NewsPeedPage = ({match}) => {
  const { id } = match.params;  // App.js에서 설정한 params 변수명: id
  return (
    <PageTemplate>
      <NewspeedContainer
        userId={id}
      />
    </PageTemplate>
  )
}

export default NewsPeedPage;