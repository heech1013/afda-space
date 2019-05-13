import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from 'components/common/Button';
import logo from 'logo.png';  // yarn eject, remove ModuleScopePlugin than you can serve from outside of /src.

const cx = classNames.bind(styles);

/* margin 8 (default) 어디서 0으로 해야 하는지? (margin:0 / padding:0) */

const Header = () => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <Link to="/">
        <img className={cx('brand')} src={logo} alt='' height='60' width='154.02'/> {/* height : width = 1 : 2.567 */}
      </Link>
      <div className={cx('menu')}>
        <Button theme={'menu'} to='/'>뉴스피드</Button>
        <Button theme={'menu'} to='/profile'>내 프로필</Button>
        <Button theme={'menu'} to='/diagnosis'>진단명</Button>
        <Button theme={'menu'} to='/medicine'>처방약</Button>
        <Button theme={'menu'} to='/center'>치료기관</Button>
        <Button theme={'menu'} to='/station'>정거장</Button>
      </div>
      <div className={cx('auth')}>
        <Button to='/login'>로그인</Button>
        <Button to='/join'>회원가입</Button>
      </div>
    </div>
    <hr className={cx('line')}/>
  </header>
);

export default Header;