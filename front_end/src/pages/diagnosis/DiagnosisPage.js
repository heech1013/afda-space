import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
// import DiagnosisListContainer from 'containers/diagnosis/DiagnosisListContainer';
import ContentListContainer from 'containers/content/ContentListContainer';

const DiagnosisPage = () => {
  return (
    <PageTemplate>
      {/* <DiagnosisListContainer/> */}
      <ContentListContainer
        type={'diagnosis'}/>
    </PageTemplate>
  )
}

export default DiagnosisPage;