import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContentTitle.scss';
import { withRouter } from 'react-router-dom';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const ContentTitle = ({ location, nameKr, nameEn, onClick, buttonString}) => {
  const noTitleName = location.pathname.split('/')[1] === 'profile';  // 프로필 페이지: true
  const bracket = nameEn ? false: true;
  return (
    <div className={cx('content-title')}>
      { noTitleName ? null : <span className={cx('nameKr')}>{nameKr}</span> }
      { buttonString ? <Button className={cx('button')} theme={'addToMyProfile'} onClick={onClick}>{buttonString}</Button> : null}
      <br/>
      { noTitleName ? null : <span className={cx('nameEn', { bracket })}>({nameEn})</span> }
    </div>
  )
  
};

export default withRouter(ContentTitle);