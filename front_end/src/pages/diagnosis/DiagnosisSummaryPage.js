import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import ContentTitle from 'components/content/ContentTitle';
import Description from 'components/content/Description';
import MiniMenu from 'components/common/MiniMenu';

const DiagnosisSummaryPage = () => {
  return (
    <PageTemplate>
      <ContentTitle
        nameKr={"주요 우울증"}
        nameEn={"Major Depressive Disorder"}
        onClick={() => console.log('addToMyProfile')}
        buttonString={"내 프로필에 추가"}
      />
      <Description nameKr={"주요 우울증"} content={"우울감과 절망감, 흥미나 쾌락의 현저한 저하, 저하되거나 증가된 식욕과 체중, 수면양의 감소나 증가, 신체적 초조 또는 활동 속도의 지체, 성욕의 상실이나 피로감, 부적절한 죄책감과 책임감, 무가치감, 집중력의 저하 또는 우유부단함, 죽음이나 자살에 대한 생각 등이 2주 이상 지속되고, 사회적·직업적으로 장애를 일으키는 증상을 말한다."} />
      <MiniMenu buttonArr={["개요", "증상", "처방약", "뉴스피드"]}/>
    </PageTemplate>

  );
}

export default DiagnosisSummaryPage;