import React from 'react';
import styles from './ContentList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

interface DivProps {
  children: React.ReactNode;
  rest: any[]
}

interface ContentItemProps {
  id: string;
  nameKr: string;
  nameEn: string;
  to: any;
  count: number;
}

interface ContentListProps {
  row_1: any
  row_2: any
  to: any
  contents: any
}

const cx = classNames.bind(styles);

function Div({children, ...rest}: DivProps) { 
  return <div {...rest}>
    {children}
  </div>
}

function ContentItem({id, nameKr, nameEn, to, count}: ContentItemProps) {
  const Element: (any | JSX.Element) = to ? Link : Div;
  const nameEnHTML = nameEn ? <div className={cx('en-title')}>({nameEn})</div> : [];

  return (
    <div className={cx('content-item')}>
      <Element className={cx('title', { to })} to={`/${to}/${id}/summary`}>{nameKr}</Element>
      <span className={cx('number', { to })}>{count}</span>
      {nameEnHTML}
    </div>
  )
};

function ContentList({row_1, row_2, to, contents}: ContentListProps) {
  const contentList = contents.map((content: any) => {    
    const {
      id, nameKr, nameEn = null, count
    } = content.toJS();

    return (
      <div className={cx('content-item-wrapper')} key={id}>
        <ContentItem
          id={id}
          nameKr={nameKr}
          nameEn={nameEn}
          to={to}
          count={count}
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