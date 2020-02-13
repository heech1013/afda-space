import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
import DescriptionContainer from 'containers/content/DescriptionContainer';
import MiniMenu from 'components/common/MiniMenu';
import DiagnosisSummaryChart from 'components/content/DiagnosisSummaryChart';

const DiagnosisSummaryPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ContentTitleContainer
        type={'diagnosis'}
        id={id}/>
      <DescriptionContainer
        type={'diagnosis'}
        id={id}/>
      <MiniMenu buttonArr={["개요", "증상", "처방약", "뉴스피드"]}/>
      <DiagnosisSummaryChart
        nameKr={'주요 우울증'}
        count={163}
      />
    </PageTemplate>

  );
}

export default DiagnosisSummaryPage;