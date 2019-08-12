import React from 'react';
import styles from './ContentList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const Div = ({children, ...rest}) => <div {...rest}>{children}</div>

const ContentItem = ({id, nameKr, nameEn, to, count}) => {
  const Element = to ? Link : Div;
  const nameEnHTML = nameEn ? <div className={cx('en-title')}>({nameEn})</div> : [];
  return (
    <div className={cx('content-item')}>
      <Element className={cx('title', { to })} to={`/${to}/${id}/summary`}>{nameKr}</Element>
      <span className={cx('number', { to })}>{count}</span>
      {nameEnHTML}
    </div>
  )
};

const ContentList = ({row_1, row_2, to, contents}) => {
  const contentList = contents.map((content) => {
    let id, nameKr, nameEn;
    const {
      fkDiagnosisId = null, fkMedicineId = null,
      count,
      RegisteredDiagnosisData = null, RegisteredMedicinePurposeData = null, RegisteredSymptomData = null
    } = content.toJS();

    if (to === 'diagnosis') {
      id = fkDiagnosisId;
      nameKr = RegisteredDiagnosisData.nameKr;
      nameEn = RegisteredDiagnosisData.nameEn;
    } else if (to === 'medicine') {
      id = fkMedicineId;
      nameKr = RegisteredMedicinePurposeData.nameKr;
      nameEn = RegisteredMedicinePurposeData.nameEn;
    } else if (to === null) {  // type or subType === 'symptom'
      id = null;
      nameKr = RegisteredSymptomData.nameKr;
    }

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