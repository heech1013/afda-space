import React from 'react';
import styles from './Header.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import Button from 'components/common/Button';
import logo from 'logo.png';  // yarn eject, remove ModuleScopePlugin than you can serve from outside of /src.

const cx = classNames.bind(styles);

const Header = ({logged, id, onLogout}) => (
  <header className={cx('header')}>
    <div className={cx('header-content')}>
      <Link to="/">
        <img className={cx('brand')} src={logo} alt='아프다 스페이스' height='43' width='130'/> {/** 1 : 5.3 */}
      </Link>
      <div className={cx('menu')}>
        {/* <Button theme={'menu'} to='/'>홈</Button> */}
        <Button theme={'menu'} to='/'>뉴스피드</Button>
        { logged ? <Button theme={'menu'} to={`/profile/${id}`}>내 프로필</Button> : null }
        <Button theme={'menu'} to='/diagnosis'>진단명</Button>
        <Button theme={'menu'} to='/medicine'>처방약</Button>
        <Button theme={'menu'} to='/station'>정거장</Button>
        {/* <Button theme={'menu'} to='/center'>치료기관</Button> */}
      </div>
      {logged ?
        <div className={cx('auth')}>
          <Button onClick={onLogout}>로그아웃</Button>
        </div>  
        :
        <div className={cx('auth')}>
          <Button to='/login'>로그인</Button>
          {/* <Button to='/join'>회원가입</Button> */}
        </div>
      }
      
    </div>
    <hr className={cx('line')}/>
  </header>
);

export default Header;