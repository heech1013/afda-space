import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitleContainer from 'containers/content/ContentTitleContainer';
// import ContentListContainer from 'containers/content/ContentListContainer';
import MiniMenu from 'components/common/MiniMenu';
import DiagnosisMedicineChartContainer from 'containers/content/DiagnosisMedicineChartContainer';

const DiagnosisMedicinePage = ({match}) => {
  const { id } = match.params;
  return (
    <PageTemplate>
      <ContentTitleContainer
        type={'diagnosis'}
        id={id}
        onClick={() => console.log('addToMyProfile')}
        // buttonString={"내 프로필에 추가"}
        />
      {/* <ContentListContainer
        type={'diagnosis'}
        subType={'medicine'}
        id={id}/> */}
      <MiniMenu buttonArr={["개요", "증상", "처방약", "뉴스피드"]}/>
      <DiagnosisMedicineChartContainer
        id={id}
      />
    </PageTemplate>
  );
}

export default DiagnosisMedicinePage;