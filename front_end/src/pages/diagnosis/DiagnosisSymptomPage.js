import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
import ContentListContainer from 'containers/content/ContentListContainer';
import MiniMenu from 'components/common/MiniMenu';

const DiagnosisSymptomPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <MiniMenu buttonArr={["개요", "증상", "처방약"]}/>
      <ContentTitleContainer
        type={'diagnosis'}
        id={id}
        onClick={() => console.log('addToMyProfile')}
        // buttonString={"내 프로필에 추가"}
      />
      <ContentListContainer
        type={'diagnosis'}
        subType={'symptom'}
        id={id}
      />
    </PageTemplate>
  );
}

export default DiagnosisSymptomPage;