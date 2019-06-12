import React from 'react';
import styles from './JoinForm.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const JoinForm = ({
  onNickChange, onAgeChange, onSexChange, onJoin,
  nick, age, selectedSex
}) => (
  <div className={cx('join-form')}>
    <div className={cx('notice')}>성공적으로 카카오톡 계정과 연결되었습니다.<br/>다음 정보를 입력하여 계정 생성을 완료하세요.</div>
    <div className={cx('nick-title')}>닉네임</div>
    <input className={cx('nick-form')} autoFocus type='text' value={nick} onChange={onNickChange}/>
    <div className={cx('age-title')}>나이</div>
    <input className={cx('age-form')} autoFocus type='number' value={age} onChange={onAgeChange}/>
    <div className={cx('sex-title')}>성별</div>
    <input className={cx('sex-form')} type='radio' value={1} checked={selectedSex === '1'} onChange={onSexChange}/>남자<br/>
    <input className={cx('sex-form')} type='radio' value={2} checked={selectedSex === '2'} onChange={onSexChange}/>여자
    <br/><div className={cx('button')} onClick={onJoin}>제출</div>
  </div>
);

export default JoinForm;