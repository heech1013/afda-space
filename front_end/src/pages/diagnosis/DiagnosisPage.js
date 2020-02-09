import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentListContainer from 'containers/content/ContentListContainer';

const DiagnosisPage = () => {
  return (
    <PageTemplate>
      <ContentListContainer
        type={'diagnosis'}
        subType={null}/>
    </PageTemplate>
  )
}

export default DiagnosisPage;