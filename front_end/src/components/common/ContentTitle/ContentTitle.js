import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContentTitle.scss';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const ContentTitle = ({nameKr, nameEn, onClick}) => (
  <div className={cx('content-title')}>
    <span className={cx('nameKr')}>{nameKr}</span>
    <Button className={cx('button')} theme={'addToMyProfile'} onClick={() => onClick()}>내 프로필에 추가</Button>
    <br/><span className={cx('nameEn')}>({nameEn})</span>
  </div>
);

export default ContentTitle;