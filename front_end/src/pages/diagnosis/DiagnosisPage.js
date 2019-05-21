import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import DiagnosisListContainer from 'containers/diagnosis/DiagnosisListContainer';

const DiagnosisPage = () => {
  return (
    <PageTemplate>
      <DiagnosisListContainer/>
    </PageTemplate>
  )
}

export default DiagnosisPage;