import React from 'react';
import classNames from 'classnames/bind';
import styles from './MiniMenu.scss';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

const routeObj = {
  "프로필": "",
  "개요": "/summary",
  "진단명": "/diagnosis",
  "증상": "/symptom",
  "처방약": "/medicine",
  "뉴스피드": "/newspeed"
}

const MiniMenu = ({buttonArr, location}) => {
  const buttonList = buttonArr.map(
    (button, index) => {
      const clicked =
        button === '프로필' ?
          (location.pathname.split('/')[1] === 'profile') && (location.pathname.split('/').length === 3) ? true : false
          :
          ('/' + location.pathname.split('/')[3]) === routeObj[button];
      return (
        <Link 
          className={cx('button', { clicked })}
          key={index}
          to={'/' + location.pathname.split('/')[1] +'/'+ location.pathname.split('/')[2] + routeObj[button]} >{button}
        </Link>
      )
    }
  )
  return (
    <div className={cx('mini-menu')}>
      {buttonList}
    </div>
  )
};

export default withRouter(MiniMenu);