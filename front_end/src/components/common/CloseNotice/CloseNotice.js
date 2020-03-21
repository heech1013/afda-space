import React from 'react';
import classNames from 'classnames/bind';
import styles from './CloseNotice.scss';

const cx = classNames.bind(styles);

const CloseNotice = () => (
  <div className={cx('notice')}>
    <p className={cx('title')}>서비스 개발 중입니다</p>
    <p className={cx('text')}>현재 페이지의 기능은 개발 중입니다.</p>
    <p className={cx('text')}>기능 제안 / 진단명, 처방약, 증상 추가 / 오류, 에러 신고 / 기타 문의 등은 언제든지 이메일로 부탁드립니다.</p>
    <br/><p className={cx('footer')}>Contact: afdaspace@gmail.com<br/>©아프다 스페이스. All rights reserved.</p>
  </div>
);

export default CloseNotice;