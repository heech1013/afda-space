import React from 'react';
import styles from './ForumTitle.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ForumTitle = ({forum}) => {
  const {
    RegisteringCenter = null, si = null, gu = null, centerName = null, doctorName = null,
    RegisteringStation = null, title = null, body = null,
  } = forum.toJS();

  const enrollerNick = title ? RegisteringStation.Profile.nick : RegisteringCenter.Profile.nick;
  const enrollerId = title ? RegisteringStation.id : RegisteringCenter.id;
  const row_1 = title ? title : '기관 정보';
  const contentUnderRow =
    title ?
      <div className={'column'}>{body}</div>
      :
      <div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'지역 : '}</span>
          <span>{si + ' ' + gu}</span>
        </div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'기관 명 : '}</span>
          <span>{centerName}</span>
        </div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'전문의 / 상담사 이름 : '}</span>
          <span>{doctorName}</span>
        </div>
      </div>;
      
  return (
    <div className={cx('forum-title')}>
      <div className={cx('row')}>
        <span className={cx('row-1')}>{row_1}</span>
        <span className={cx('enroller')}>{'등록한 사람 : '}</span>
        <Link className={cx('nick')} to={`/profile/${enrollerId}`}>{enrollerNick}</Link>
      </div>
      <hr className={cx('hr')}/>
      {contentUnderRow}
    </div>
  )
  
};

export default ForumTitle;