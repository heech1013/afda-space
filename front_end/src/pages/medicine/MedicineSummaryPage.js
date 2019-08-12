import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitle from 'components/content/ContentTitle';
import Description from 'components/content/Description';
import MiniMenu from 'components/common/MiniMenu';

const MedicineSummaryPage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        nameKr={"부프로피온"}
        nameEn={"Bupropion"}
        onClick={() => console.log('addToMyProfile')}
        buttonString={"내 프로필에 추가"}
      />
      <Description nameKr={"부프로피온"} content={"부프로피온(bupropion) 혹은 부프로피온염산염은 영국 글락소스미스클라인이 개발한 항우울제 혹은 경구용 금연 치료제로 쓰이는 의약품이다."} />
      <MiniMenu buttonArr={["개요", "뉴스피드"]}/>
    </PageTemplate>

  );
}

export default MedicineSummaryPage;