import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
// import ContentTitle from 'components/content/ContentTitle';
import MiniMenu from 'components/common/MiniMenu';
// import PostList from 'components/post/PostList';
import CloseNotice from 'components/common/CloseNotice';

const DiagnosisNewspeedPage = () => {
  return (
    <PageTemplate>
      <MiniMenu buttonArr={["개요", "증상", "처방약", "뉴스피드"]}/>
      <CloseNotice/>
    </PageTemplate>

  );
}

export default DiagnosisNewspeedPage;