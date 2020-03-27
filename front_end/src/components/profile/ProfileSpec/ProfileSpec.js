import React from 'react';
import styles from './ProfileSpec.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const specItem = ({
  type, contentId, nameKr,
  dateAtFirstSymptom, dateAtFirstDiagnosed,  // diagnosis
  dosage,  // medicine
}) => {
  let item = null;
  if (type === 'diagnosis') {
    item = <div className={cx('profile-spec-item')}>
      <Link className={cx('profile-spec-item-link')} to={`/${type}/${contentId}`}>{nameKr}</Link>
      <div className={cx('profile-spec-item-detail')}>{dateAtFirstSymptom}에 증상이 처음 발견됨</div>
      <div className={cx('profile-spec-item-detail')}>{dateAtFirstDiagnosed}에 진단 받음</div>
    </div>;
  } else if (type === 'medicine') {
    item = <div className={cx('profile-spec-item')}>
      <Link className={cx('profile-spec-item-link')} to={`/${type}/${contentId}`}>{nameKr}</Link>
      <div className={cx('profile-spec-item-detail')}>{dosage}</div>
    </div>;
  } else if (type === 'symptom') {
    item = <span>{nameKr + ' / '}</span>;
  }

  return {item};
}

const ProfileSpec = ({
  diagnosisList, medicineList, symptomList
}) => {
  const diagnosisItemList = diagnosisList.map((diagnosis, index) => {
    const { id, diagnosisName, dateAtFirstSymptom = null, dateAtFirstDiagnosed = null } = diagnosis.toJS();
    return (
      <div key={index}>
        <specItem
          type={'diagnosis'}
          contentId={id}
          nameKr={diagnosisName}
          dateAtFirstSymptom={dateAtFirstSymptom}
          dateAtFirstDiagnosed={dateAtFirstDiagnosed}
        />
        <hr/>
      </div>
    )
  });
  const medicineItemList = medicineList.map((medicine, index) => {
    const { id, medicineName, dosage = null } = medicine.toJS();
    return (
      <div key={index}>
        <specItem
          type={'medicine'}
          contentId={id}
          nameKr={medicineName}
          dosage={dosage}
        />
        <hr/>
      </div>
    )
  });
  const symptomItemList = symptomList.map((symptom, index) => {
    const { id, symptomName } = symptom.toJS();
    return (
      <div key={index}>
        <specItem
          type={'symptom'}
          contentId={id}
          nameKr={symptomName}
        />
        <hr/>
      </div>
    )
  });

  return (
    <div className={cx('profile-spec')}>
      <div className={cx('profile-spec-title')}>진단명</div>
      <hr className={cx('profile-spec-hr')}/>
      {diagnosisItemList}
      <div className={cx('profile-spec-title')}>처방약</div>
      <hr className={cx('profile-spec-hr')}/>
      {medicineItemList}
      <div className={cx('profile-spec-title')}>증상</div>
      <hr className={cx('profile-spec-hr')}/>
      {symptomItemList}
    </div>
  )
};

export default ProfileSpec;