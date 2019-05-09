import React from 'react';
import classNames from 'classnames/bind';
import styles from './MiniMenu.scss';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

const routeObj = {
  "개요": "/summary",
  "증상명": "/symptom",
  "처방약": "/medicine",
  "뉴스피드": "/newspeed"
}

const MiniMenu = ({buttonArr, location}) => {
  const a = buttonArr.map(
    (button, index) => {
      const clicked = ('/' + location.pathname.split('/')[2]) === routeObj[button];
      return (
        <Link className={cx('button', { clicked })} key={index} to={'/' + location.pathname.split('/')[1] + routeObj[button]} >{button}</Link>
      )
    }
  )
  return (
    <div className={cx('mini-menu')}>
      {a}
    </div>
  )
};

export default withRouter(MiniMenu);