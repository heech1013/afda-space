import React from 'react';
import classNames from 'classnames/bind';
import styles from './LoginWrapper.scss';
import { Link } from 'react-router-dom';
import logo from 'logo.png';

interface LoginWrapperProps {
  children: React.ReactNode;
}

const cx = classNames.bind(styles);

function LoginWrapper({ children }: LoginWrapperProps) {
  return (
      <div className={cx('login-wrapper')}>
        <div className={cx('logo')}>
          <Link to='/'>
            <img src={logo} width={160} height={30} alt={'아프다 스페이스'}/>
          </Link>
        </div>
        <div className={cx('border')}>
          {children} {/** for KaKao Login */}
        </div>
      </div>
  )
};

export default LoginWrapper;