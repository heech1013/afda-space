import React from 'react';
import styles from './ContentList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ContentItem = ({title, enTitle, number}) => (
  <div className={cx('content-item')}>
    <Link className={cx('title')} to={`/diagnosis/summary?title=${title}`}>{title}</Link>
    <span className={cx('number')}>{number}</span>
    <div className={cx('en-title')}>({enTitle})</div>
    
  </div>
);

const ContentList = ({contents}) => {
  const contentList = contents.map((content) => {
    const {id, title, enTitle, number} = content;
    return (
      <div className={cx('content-item-wrapper')} key={id}>
        <ContentItem
          title={title}
          enTitle={enTitle}
          number={number}
        />
        <hr className={cx('hr')}/>
      </div>
    );
  });
  return (
    <div className={cx('content-list')}>
      <div className={cx('row')}>
        <span className={cx('row-1')}>진단명</span>
        <span className={cx('row-2')}>사람 수</span>
        <hr className={cx('row-hr')}/>
      </div>
      {contentList}
    </div>   
  );
};

export default ContentList;