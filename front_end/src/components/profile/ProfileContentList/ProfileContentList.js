import React from 'react';
import styles from './ProfileContentList.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Content = ({
  contentType, updatable,
  diagnosisName, ageAtFirstSymptom, periodOfSymptom,
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
          <span className={cx('column-1')}>{'증상이 처음 나타난 시기 : '}</span>
          <span className={cx('column-2')}>{ageAtFirstSymptom}</span>
        </div>
        <div className={cx('column')}>
          <span className={cx('column-1')}>{'증상을 겪은 기간 : '}</span>
          <span className={cx('column-2')}>{periodOfSymptom}</span>
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
  const buttonHTML = updatable ? <Button className={cx('button')}>수정하기</Button> : null;

  return (
    <div className={cx('content', { updatable })}>
      {contentHTML}
      {buttonHTML}
    </div>
  )
}

const ProfileContentList = ({contents, updatable, location}) => {
  const contentList = contents.map((content) => {
    const {
      id,
      diagnosisName = null, ageAtFirstSymptom = null, periodOfSymptom = null,
      symptomName = null,
      medicineName = null, purposeOfPrescription = null, perceivedEffect = null, degreeOfSideEffect = null, symptomOfSideEffect = null
    } = content;
    return (
      <div key={id}>
        <Content
          contentType={location.pathname.split('/')[2]}
          updatable={updatable}
          diagnosisName={diagnosisName}
          ageAtFirstSymptom={ageAtFirstSymptom}
          periodOfSymptom={periodOfSymptom}
          symptomName={symptomName}
          medicineName={medicineName}
          purposeOfPrescription={purposeOfPrescription}
          perceivedEffect={perceivedEffect}
          degreeOfSideEffect={degreeOfSideEffect}
          symptomOfSideEffect={symptomOfSideEffect}
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