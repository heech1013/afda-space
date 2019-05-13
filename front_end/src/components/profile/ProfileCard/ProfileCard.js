import React from 'react';
import styles from './ProfileCard.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ProfileCard = ({nick, age, sex, introduction}) => (
  <div className={cx('profile-card')}>
    <span className={cx('nick')}>{nick}</span>
    <span className={cx('age-and-sex')}>{age}살, {sex}</span>
    <div className={cx('introduction')}>{introduction}</div>
  </div>
);

export default ProfileCard;