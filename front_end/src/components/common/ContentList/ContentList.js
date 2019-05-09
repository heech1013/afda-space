import React from 'react';
import styles from './ContentList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

const ContentItem = ({title, enTitle, number, to}) => {
  const Element = to ? Link : Div;
  const enTitleHTML = enTitle ? <div className={cx('en-title')}>({enTitle})</div> : [];
  return (
    <div className={cx('content-item')}>
      <Element className={cx('title', { to })} to={`/${to}/summary?title=${title}`}>{title}</Element>
      <span className={cx('number', { to })}>{number}</span>
      {enTitleHTML}
    </div>
  )
};

const ContentList = ({row_1, row_2, to, contents}) => {
  const contentList = contents.map((content) => {
    const { id, title, enTitle, number } = content;
    return (
      <div className={cx('content-item-wrapper')} key={id}>
        <ContentItem
          title={title}
          enTitle={enTitle}
          number={number}
          to={to}
        />
        <hr className={cx('hr')}/>
      </div>
    );
  });
  return (
    <div className={cx('content-list')}>
      <div className={cx('row')}>
        <span className={cx('row-1')}>{row_1}</span>
        <span className={cx('row-2')}>{row_2}</span>
        <hr className={cx('row-hr')}/>
      </div>
      {contentList}
    </div>   
  );
};

export default ContentList;