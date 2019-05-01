import React, { Fragment } from 'react';
import styles from './Badge.scss';
import classNames from 'classnames/bind';

// 응원해요
import supportImg from 'support.png';
import supportCheckedImg from 'support-checked.png';

const cx = classNames.bind(styles);

const Badge = ({theme, checked, number, onClick}) => {
  let imgChecked, imgUnchecked, mention;
  if (theme === 'support') {
    imgChecked = supportCheckedImg;
    imgUnchecked = supportImg;
    mention = '응원해요';
  }
  return (
    <Fragment>
      {
        checked ?
        <img className={cx('img')} src={imgChecked} height='22' width='22' onClick={() => onClick()} alt='img-checked'/>
        : <img className={cx('img')} src={imgUnchecked} height='22' width='22' onClick={() => onClick()} alt='img-unchecked'/>
      }
      <div className={cx('mention')}>{mention} <b>{number}</b>개</div>
    </Fragment>
  )
};

export default Badge;