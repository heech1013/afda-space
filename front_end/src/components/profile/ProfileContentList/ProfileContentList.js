import React from 'react';
import styles from './ProfileContentList.scss';
import classNames from 'classnames/bind';
import { withRouter } from 'react-router-dom';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Content = ({
  id, /** data 자체 PK id */
  contentId,
  contentType,
  updatable,
  onDelete, onModal, updateContentId,
  diagnosisName, dateAtFirstSymptom, dateAtFirstDiagnosed,
  symptomName,
  medicineName, purposeOfPrescription, perceivedEffect, degreeOfSideEffect, symptomOfSideEffect, dosageId, dosage
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
            <div className={cx('column')}>
              <span className={cx('column-1')}>{'용량 : '}</span>
              <span className={cx('column-2')}>{dosage}</span>
            </div>
          </div>
          : null;
  const buttonHTML = !updatable ?
    null
    :
    contentType === 'medicine' ?
      <div>
        <Button  onDelete={() => onDelete(id)}>삭제하기</Button>
        <Button  onDelete={() => {
          updateContentId(contentId);
          onModal('profileMedicineEvaluationAdd');
        }}>평가하기</Button>
        <Button  onDelete={() => {
          updateContentId(contentId);
          onModal('profileMedicinePurposeAdd');
        }}>처방목적 추가하기</Button>
        { 
          (dosage === '-') ? 
            <Button  onDelete={() => {  /** medicineDosageData가 등록되어 있지 않은 경우 */
              updateContentId(contentId);
              onModal('profileMedicineDosageAdd');
            }}>용량 추가하기</Button>
            :
            <Button onDelete={() => onDelete(dosageId, 'dosage')}>용량 삭제하기</Button>  /** medicineDosageData가 등록되어 있는 경우 */
        }
      </div>
      :
      <Button className={cx('button')} onDelete={() => onDelete(id)}>삭제하기</Button>;

  return (
    <div className={cx('content', { updatable })}>
      {contentHTML}
      {buttonHTML}
    </div>
  )
}

const ProfileContentList = ({contents, updatable, onDelete, onModal, updateContentId, location}) => {
  const contentList = contents.map((content) => {
    const {
      id,  // data 자체의 id(PK)
      contentId = null,  // diagnosis(아직 추가하지 않았음), symptom(아직 추가하지 않았음), medicine의 id
      diagnosisName = null, dateAtFirstSymptom = null, dateAtFirstDiagnosed = null,
      symptomName = null,
      medicineName = null, purposeOfPrescription = null, perceivedEffect = null, degreeOfSideEffect = null, symptomOfSideEffect = null, dosageId = null, dosage = null
    } = content.toJS();
    return (
      <div key={id}>
        <Content
          id={id} contentId={contentId}
          contentType={location.pathname.split('/')[3]}
          updatable={updatable}
          onDelete={onDelete} onModal={onModal} updateContentId={updateContentId}
          diagnosisName={diagnosisName} dateAtFirstSymptom={dateAtFirstSymptom} dateAtFirstDiagnosed={dateAtFirstDiagnosed}
          symptomName={symptomName}
          medicineName={medicineName} purposeOfPrescription={purposeOfPrescription} perceivedEffect={perceivedEffect} degreeOfSideEffect={degreeOfSideEffect} symptomOfSideEffect={symptomOfSideEffect} dosageId={dosageId} dosage={dosage}
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