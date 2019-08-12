import React from 'react';
import classNames from 'classnames/bind';
import styles from './Description.scss';

const cx = classNames.bind(styles);

const Description = ({nameKr, content}) => (
  <div className={cx('description')}>
    <div className={cx('title')}>{nameKr}(이)란?</div>
    <div className={cx('content')}>{content}</div>
  </div>
);

export default Description;