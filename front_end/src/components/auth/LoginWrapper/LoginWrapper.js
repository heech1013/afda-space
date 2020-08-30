import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoginWrapper.scss';
import { Link } from 'react-router-dom';

import logo from 'logo.png';

const cx = classNames.bind(styles);

const LoginWrapper = ({children}) => {
  return (
      <div className={cx('login-wrapper')}>
        <div className={cx('logo')}>
          <Link to='/'>
            <img src={logo} width={250} height={80} alt={'아픔모아'}/>
          </Link>
        </div>
        <div className={cx('border')}>
          {children} {/** for KaKao Login */}
        </div>
      </div>
  )
};

export default LoginWrapper;