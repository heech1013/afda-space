import React from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import PageTemplate from 'components/common/PageTemplate';
import NewspeedContainer from 'containers/post/NewspeedContainer';

const NewsPeedPage = ({location}) => {
  const query = queryString.parse(location.search);
  const { userId } = query;

  return (
    <PageTemplate>
      <NewspeedContainer
        userId={userId}
      />
    </PageTemplate>
  )
}

export default withRouter(NewsPeedPage);