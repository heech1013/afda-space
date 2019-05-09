import React, { Fragment } from 'react';
import styles from './DynamicContentList.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';

const cx = classNames.bind(styles);

const ContentItem = ({pathname, id, area, centerName, doctorName, evalCount, subject, helpfulCount, answerCount}) => {
  const row =
    (pathname === '/center') ?
      <Fragment>
        <span className={cx('row-area', 'content')}>{area}</span>
        <span className={cx('row-center-name', 'content')}>{centerName}</span>
        <span className={cx('row-doctor-name', 'content')}>{doctorName}</span>
        <span className={cx('row-eval-count', 'content')}>{evalCount}</span>
      </Fragment>
      : (pathname === '/station') ?
        <Fragment>
          <span className={cx('row-subject', 'content')}>{subject}</span>
          <span className={cx('row-helpful-count', 'content')}>{helpfulCount}</span>
          <span className={cx('row-answer-count', 'content')}>{answerCount}</span>
        </Fragment>
        : null;
  return (
    <Link className={cx('content-item')} to={`${pathname}/${id}`}>
      {row}
      <hr/>
    </Link>
  )
}

const DynamicContentList = ({contents, location}) => {
  const row =
    (location.pathname === '/center') ?
      <Fragment>
        <span className={cx('row-area')}>{'지역'}</span>
        <span className={cx('row-center-name')}>{'기관명'}</span>
        <span className={cx('row-doctor-name')}>{'전문의 / 상담사 이름'}</span>
        <span className={cx('row-eval-count')}>{'평가 수'}</span>
      </Fragment>
      : (location.pathname === '/station') ?
        <Fragment>
          <span className={cx('row-subject')}>{'주제'}</span>
          <span className={cx('row-helpful-count')}>{'유용해요'}</span>
          <span className={cx('row-answer-count')}>{'답변 수'}</span>
        </Fragment>
        : null;
  
  const contentList = contents.map((content) => {
    const { id, area, centerName, doctorName, evalCount, subject, helpfulCount, answerCount } = content;
    return (
      <div key={id}>
        <ContentItem
          pathname={location.pathname}
          id={id}
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
        <hr className={cx('hr')}/>
      </div>
    )
  });
  
  return (
    <div className={cx('dynamic-content-list')}>
      {row}
      {contentList}
    </div>

    
  )
};

export default withRouter(DynamicContentList);