import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
import DescriptionContainer from 'containers/content/DescriptionContainer';
import MiniMenu from 'components/common/MiniMenu';
import DiagnosisSummaryChartContainer from 'containers/content/DiagnosisSummaryChartContainer';

const DiagnosisSummaryPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <MiniMenu buttonArr={["개요", "증상", "처방약", "뉴스피드"]}/>
      <ContentTitleContainer
        type={'diagnosis'}
        id={id}/>
      <DescriptionContainer
        type={'diagnosis'}
        id={id}/>
      <DiagnosisSummaryChartContainer
        id={id}
      />
    </PageTemplate>

  );
}

export default DiagnosisSummaryPage;