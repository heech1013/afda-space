import React from 'react';
import classNames from 'classnames/bind';
import styles from './MainContent.scss';

const cx = classNames.bind(styles);

const MainContent = () => (
  <div className={cx('main-content-notice')}>
    <p className={cx('main-content-title')}>아프다 스페이스에 오신 것을 환영합니다.</p>
    <p className={cx('main-content-text')}>아프다 스페이스는 심리적 · 정신적 어려움을 겪고 있는 사람들과 함께 직접 만들어가는 정보 공유 플랫폼입니다.</p>
    <p className={cx('main-content-text')}>우리의 목표는 <span className={cx('bold')}>실제 사람들의 지식과 경험을 모아 새로운 통찰을 제공</span>하고, 이를 통해 <span className={cx('bold')}>우리 삶의 질을 향상시키는 것</span>입니다.</p>
    <br/>
    <p className={cx('main-content-text')}>아프다 스페이스에서는 다음과 같은 일들을 할 수 있습니다.</p>
    <ul>
      <li> 자신과 같은 진단명, 예를 들면 우울장애를 겪고 있는 사람들이 <span className={cx('bold')}>실제로 어떤 처방약을 먹고, 어떤 증상을 주로 겪었는지</span> 살펴볼 수 있습니다.</li><br/>
      <li> 자신과 같은 처방약, 예를 들면 렉사프로정을 먹고 있는 사람들은 <span className={cx('bold')}>실제로 어떤 목적으로 이 약을 처방 받았고, 어떤 효과를 보았고, 어떤 부작용을 겪었는지</span> 살펴볼 수 있습니다.</li><br/>
      <li> 자신이 겪은 진단명과 처방약, 증상에 대한 데이터를 프로필에 추가하여 아프다 스페이스의 <span className={cx('bold')}>정보 생태계에 기여할 수 있습니다.</span> 추가된 데이터들은 통계화되어 앞으로 비슷한 어려움을 겪게 될 사람들에게 도움이 될 수 있습니다.</li><br/>
      <li> 정신 건강에 관련된 다양한 주제들에 대해 논의할 수 있습니다.</li>
    </ul>
    
    {/* <br/>
    <p className={cx('main-content-text')}> 아프다 스페이스는 민감한 개인 정보를 주요 데이터로 다루고 있는 만큼, 서비스를 투명하게 운영하기 위해 노력하고 있습니다. <span role="img" aria-label="">&#128273;</span><a className={cx('link')} href="https://www.notion.so/a4f73730121a41658a261b5670fcc3f0">사용자의 개인 정보를 어떻게 다루는지</a>에 대한 부분을 포함하여, 서비스 운영과 관련하여 최대한 많은 부분을 점차 공유해나갈 예정입니다.</p>
    <p className={cx('main-content-text')}><span role="img" aria-label="">&#128210;</span><a className={cx('link')} href="https://www.notion.so/146f29654a8141c09712808288e55137">아프다 스페이스 오픈북</a></p> */}
    <br/>
    <p className={cx('main-content-text')}>기능 제안, 진단명·처방약·증상 추가, 오류·에러 신고, 기타 문의 등은 언제든지 이메일로 부탁드립니다.</p>

    <br/>
    <p className={cx('main-content-footer')}>Contact: afdaspace@gmail.com<br/>©아프다 스페이스. All rights reserved.</p>
  </div>
);

export default MainContent;