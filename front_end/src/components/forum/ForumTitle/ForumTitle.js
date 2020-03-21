import React from 'react';
import styles from './ForumTitle.scss';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ForumTitle = ({ forum }) => {
  const {
    user, createdAt,
    si = null, gu = null, centerName = null, doctorName = null,  // center
    title = null, body = null,  // station
  } = forum.toJS();
  
  const enrollerNick = user ? user.profile.nick : '';
  // const enrollerId = user ? user.id;
  
  const row_1 = title ? title : '기관 정보';
  const contentUnderRow =
    title ?  // station
      <div className={'column'}>{body}</div>
      :  // center
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
        <div className={cx('row-1')}>{row_1}</div>
        <div className={cx('enroller')}>
          <span>{'등록한 사람 : '}</span>
          <span className={cx('nick')}>{enrollerNick}</span>  {/* <Link className={cx('nick')} to={`/profile/${enrollerId}`}>{enrollerNick}</Link> */}
        </div>
        <div className={cx('createdAt')}>{createdAt}</div>
      </div>
      <hr className={cx('hr')}/>
      {contentUnderRow}
    </div>
  )
  
};

export default ForumTitle;