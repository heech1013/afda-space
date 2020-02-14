import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
import DescriptionContainer from 'containers/content/DescriptionContainer';
import MiniMenu from 'components/common/MiniMenu';
import MedicineSummaryChart from 'components/content/MedicineSummaryChart';

const MedicineSummaryPage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ContentTitleContainer
        type={'medicine'}
        id={id} />
      <DescriptionContainer
        type={'medicine'}
        id={id} />
      <MiniMenu buttonArr={["개요", "뉴스피드"]}/>
      <MedicineSummaryChart
        nameKr={'부프로피온'}
      />
    </PageTemplate>

  );
}

export default MedicineSummaryPage;