import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoginWrapper.scss';
import { Link } from 'react-router-dom';

import logo from 'logo2.png';

const cx = classNames.bind(styles);

const LoginWrapper = ({children}) => {
  return (
      <div className={cx('login-wrapper')}>
        <div className={cx('logo')}>
          <Link to='/'>
            <img src={logo} width={231.070114} height={90} alt={'아프다 스페이스'}/>
          </Link>
        </div>
        <div className={cx('border')}>
          {children}
        </div>
      </div>
  )
};

export default LoginWrapper;