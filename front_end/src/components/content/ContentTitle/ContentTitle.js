import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContentTitle.scss';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const ContentTitle = ({nameKr, nameEn, onClick, buttonString}) => {
  const bracket = nameEn ? false: true;
  return (
    <div className={cx('content-title')}>
      <span className={cx('nameKr')}>{nameKr}</span>
      <Button className={cx('button')} theme={'addToMyProfile'} onClick={() => onClick()}>{buttonString}</Button>
      <br/><span className={cx('nameEn', { bracket })}>({nameEn})</span>
    </div>
  )
  
};

export default ContentTitle;