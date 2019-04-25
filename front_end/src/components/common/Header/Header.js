import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';

import logo from 'logo.png';  // yarn eject, remove ModuleScopePlugin than you can serve from outside of /src.

const cx = classNames.bind(styles);

const Header = () => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <div className={cx('brand')}>
        <img className={cx('brand-logo')} src={logo} alt='' height='50' width='63.5'/>
        <div className={cx('brand-name')}>
          아프다
          <br/>스페이스
        </div>
      </div>
    </div>
    <hr className={cx('line')}/>
  </header>
);

export default Header;