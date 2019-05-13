import React from 'react';
import styles from './ForumTitle.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ForumTitle = ({area = null, centerName = null, doctorName = null, subject = null, body = null, enroller}) => {
  const row_1 = area ? '기관 정보' : subject;
  const contentUnderRow =
    area ?
      <div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'지역 : '}</span>
          <span>{area}</span>
        </div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'기관 명 : '}</span>
          <span>{centerName}</span>
        </div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'전문의 / 상담사 이름 : '}</span>
          <span>{doctorName}</span>
        </div>
      </div>
      :
      <div className={'column'}>{body}</div>;
      
  return (
    <div className={cx('forum-title')}>
      <div className={cx('row')}>
        <span className={cx('row-1')}>{row_1}</span>
        <span className={cx('enroller')}>{'등록한 사람 : '}</span>
        <Link className={cx('nick')} to={`/profile/${enroller}`}>{enroller}</Link>
      </div>
      <hr className={cx('hr')}/>
      {contentUnderRow}
    </div>
  )
  
};

export default ForumTitle;