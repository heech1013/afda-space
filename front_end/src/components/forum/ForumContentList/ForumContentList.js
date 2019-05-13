import React from 'react';
import styles from './ForumContentList.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

const ContentItem = ({pathname, id, area, centerName, doctorName, evalCount, subject, helpfulCount, answerCount}) => {
  const row =
    (pathname === '/center') ?
      <Link className={cx('content-link')} to={`${pathname}/${id}`}>
        <span className={cx('area')}>{area}</span>
        <span className={cx('center-name')}>{centerName}</span>
        <span className={cx('doctor-name')}>{doctorName}</span>
        <span className={cx('eval-count')}>{evalCount}</span>
      </Link>
      : (pathname === '/station') ?
        <Link className={cx('content-link')} to={`${pathname}/${id}`}>
          <span className={cx('subject')}>{subject}</span>
          <span className={cx('helpful-count')}>{helpfulCount}</span>
          <span className={cx('answer-count')}>{answerCount}</span>
        </Link>
        : null;
  return (
    <div className={cx('content-item')} to={`${pathname}/${id}`}>
      {row}
      <hr className={cx('content-hr')}/>
    </div>
  )
}

const ForumContentList = ({contents, location}) => {
  const row =
    (location.pathname === '/center') ?
      <div className={cx('row')}>
        <span className={cx('row-area')}>{'지역'}</span>
        <span className={cx('row-center-name')}>{'기관명'}</span>
        <span className={cx('row-doctor-name')}>{'전문의 / 상담사 이름'}</span>
        <span className={cx('row-eval-count')}>{'평가 수'}</span>
      </div>
      : (location.pathname === '/station') ?
        <div className={cx('row')}>
          <span className={cx('row-subject')}>{'주제'}</span>
          <span className={cx('row-helpful-count')}>{'유용해요'}</span>
          <span className={cx('row-answer-count')}>{'답변 수'}</span>
        </div>
        : null;
  
  const contentList = contents.map((content) => {
    const {
      id,
      area = null, centerName = null, doctorName = null, evalCount = null,  // center
      subject = null, helpfulCount = null, answerCount = null  // station
    } = content;
    return (
        <ContentItem
          id={id}
          key={id}
          pathname={location.pathname}
          // center
          area={area}
          centerName={centerName}
          doctorName={doctorName}
          evalCount={evalCount}
          // station
          subject={subject}
          helpfulCount={helpfulCount}
          answerCount={answerCount}
        />
    )
  });
  
  return (
    <div className={cx('forum-content-list')}>
      {row}
      <hr className={cx('row-hr')}/>
      {contentList}
    </div>

    
  )
};

export default withRouter(ForumContentList);