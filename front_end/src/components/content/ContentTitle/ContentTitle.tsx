import React from 'react';
import classNames from 'classnames/bind';
import styles from './ContentTitle.scss';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import Button from 'components/common/Button';

type ContentTitleProps = RouteComponentProps & {
  nameKr: string;
  nameEn: string;
  onClick: () => void
  buttonString: string;
}

const cx = classNames.bind(styles);

function ContentTitle({ location, nameKr, nameEn, onClick, buttonString }: ContentTitleProps) {
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