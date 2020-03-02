import React from 'react';
import classNames from 'classnames/bind';
import styles from './CloseNotice.scss';

const cx = classNames.bind(styles);

const CloseNotice = () => (
  <div className={cx('notice')}>
    <p className={cx('title')}>서비스 개발 중입니다</p>
    <p className={cx('text')}>현재 페이지의 기능은 개발 중입니다. 내 프로필(로그인 후 이용 가능), 진단명, 처방약 메뉴 등을 사용해보세요.</p>
    {/* <p className={cx('text')}>아프다 스페이스는 마음이 아픈 사람들을 위한 공간입니다. 우리의 목적은 우리 스스로 정보를 공유하여 더 당당하고 건강한 사회를 만드는 것입니다.</p> */}
    <p className={cx('text')}>기능 제안 / 진단명, 처방약, 증상 추가 / 오류, 에러 신고 / 기타 문의 등은 언제든지 이메일로 부탁드립니다.</p>
    <br/><p className={cx('footer')}>Contact: afdaspace@gmail.com<br/>©아프다 스페이스. All rights reserved.</p>
  </div>
);

export default CloseNotice;