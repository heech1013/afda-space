import React from 'react';
import styles from './ProfileCard.scss';
import classNames from 'classnames/bind';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const ProfileCard = ({updatable, onEdit, profile}) => {
  const buttonHTML = updatable ? <Button className={cx('button')} onClick={onEdit}>수정하기</Button> : null;
  const { nick, age, sex, introduction } = profile.toJS();
  const interpretedSex = sex === 1 ? '남자' : sex === 2 ? '여자' : null;
  return (
    <div className={cx('profile-card', { updatable })}>
      <span className={cx('nick')}>{nick}</span>
      <span className={cx('age-and-sex')}>{age}살, {interpretedSex}</span>
      <div className={cx('introduction')}>{introduction}</div>
      {buttonHTML}
    </div>
  )
};

export default ProfileCard;