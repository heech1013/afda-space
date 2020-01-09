import React from 'react';
import styles from './ProfileContentList.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Content = ({
  contentType,
  updatable,
  id /** data 자체 PK id */, onClick,
  diagnosisName, dateAtFirstSymptom, dateAtFirstDiagnosed,
  symptomName,
  medicineName, purposeOfPrescription, perceivedEffect, degreeOfSideEffect, symptomOfSideEffect
}) => {
  const contentHTML =
    contentType === 'diagnosis' ?
      <div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'진단명 : '}</span>
          <span className={cx('column-2')}>{diagnosisName}</span>
        </div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'관련 증상이 처음 발견된 날짜 : '}</span>
          <span className={cx('column-2')}>{dateAtFirstSymptom}</span>
        </div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'진단을 받은 날짜 : '}</span>
          <span className={cx('column-2')}>{dateAtFirstDiagnosed}</span>
        </div>
      </div>
      :
      contentType === 'symptom' ?
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'증상 : '}</span>
          <span className={cx('column-2')}>{symptomName}</span>
        </div>
        :
        contentType === 'medicine' ?
          <div>
            <div className={cx('column')}>
              <span className={cx('column-1')}>{'처방약 : '}</span>
              <span className={cx('column-2')}>{medicineName}</span>
            </div>
            <div className={cx('column')}>
              <span className={cx('column-1')}>{'치료 목적 : '}</span>
              <span className={cx('column-2')}>{purposeOfPrescription}</span>
            </div>
            <div className={cx('column')}>
              <span className={cx('column-1')}>{'인지된 효과 : '}</span>
              <span className={cx('column-2')}>{perceivedEffect}</span>
            </div>
            <div className={cx('column')}>
              <span className={cx('column-1')}>{'부작용 정도 : '}</span>
              <span className={cx('column-2')}>{degreeOfSideEffect}</span>
            </div>
            <div className={cx('column')}>
              <span className={cx('column-1')}>{'부작용 증상 : '}</span>
              <span className={cx('column-2')}>{symptomOfSideEffect}</span>
            </div>
          </div>
          : null;
  const buttonHTML = updatable ? <Button className={cx('button')} onClick={() => onClick(id)}>삭제하기</Button> : null;

  return (
    <div className={cx('content', { updatable })}>
      {contentHTML}
      {buttonHTML}
    </div>
  )
}

const ProfileContentList = ({contents, updatable, onClick, location}) => {
  const contentList = contents.map((content) => {
    const {
      id,  // data 자체의 id(PK)
      diagnosisName = null, dateAtFirstSymptom = null, dateAtFirstDiagnosed = null,
      symptomName = null,
      medicineName = null, purposeOfPrescription = null, perceivedEffect = null, degreeOfSideEffect = null, symptomOfSideEffect = null
    } = content.toJS();
    return (
      <div key={id}>
        <Content
          contentType={location.pathname.split('/')[3]}
          updatable={updatable}
          id={id} onClick={onClick}
          diagnosisName={diagnosisName} dateAtFirstSymptom={dateAtFirstSymptom} dateAtFirstDiagnosed={dateAtFirstDiagnosed}
          symptomName={symptomName}
          medicineName={medicineName} purposeOfPrescription={purposeOfPrescription} perceivedEffect={perceivedEffect} degreeOfSideEffect={degreeOfSideEffect} symptomOfSideEffect={symptomOfSideEffect}
        />
        <hr className={cx('hr')}/>
      </div>
    )
  })
  return (
    <div className={cx('content-list')}>
      {contentList}
    </div>
  )
};

export default withRouter(ProfileContentList);