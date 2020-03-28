import React from 'react';
import styles from './ProfileSpec.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const SpecItem = ({
  type, contentId, nameKr,
  dateAtFirstSymptom, dateAtFirstDiagnosed,  // diagnosis
  dosage,  // medicine
}) => {
  let item = null;
  if (type === 'diagnosis') {
    item = <div>
      <div className={cx('profile-spec-item-link-wrapper')}><Link className={cx('profile-spec-item-link')} to={`/${type}/${contentId}/summary`}>{nameKr}</Link></div>
      {
        (dateAtFirstSymptom || dateAtFirstDiagnosed ) ?
          <div className={cx('profile-spec-item-detail-wrapper')}>
            { (dateAtFirstSymptom) ? <div>증상을 처음 인지한 날짜 : {dateAtFirstSymptom}</div> : null }
            { (dateAtFirstDiagnosed) ? <div>처음 진단 받은 날짜 : {dateAtFirstDiagnosed}</div> : null }
          </div> : null
      }
    </div>;
  } else if (type === 'medicine') {
    item = <div>
      <div className={cx('profile-spec-item-link-wrapper')}><Link className={cx('profile-spec-item-link')} to={`/${type}/${contentId}/summary`}>{nameKr}</Link></div>
      { dosage ? <div className={cx('profile-spec-item-detail-wrapper')}>{dosage}</div> : null }
    </div>;
  } else if (type === 'symptom') {
    item = <span>{nameKr + '/'}</span>;
  }

  return (
    <div>
      {item}
    </div>
  );
}

const ProfileSpec = ({
  diagnosisList, medicineList, symptomList
}) => {
  const diagnosisItemList = diagnosisList.map((diagnosis, index) => {
    const { contentId, diagnosisName, dateAtFirstSymptom = null, dateAtFirstDiagnosed = null } = diagnosis.toJS();
    return (
      <div className={cx('profile-spec-item-wrapper')} key={index}>
        <SpecItem
          type={'diagnosis'}
          contentId={contentId}  // content(diagnosis, medicine)의 PK id
          nameKr={diagnosisName}
          dateAtFirstSymptom={dateAtFirstSymptom}
          dateAtFirstDiagnosed={dateAtFirstDiagnosed}
        />
      </div>
    )
  });
  const medicineItemList = medicineList.map((medicine, index) => {
    const { contentId, medicineName, dosage = null } = medicine.toJS();
    return (
      <div className={cx('profile-spec-item-wrapper')} key={index}>
        <SpecItem
          type={'medicine'}
          contentId={contentId}
          nameKr={medicineName}
          dosage={dosage}
        />
      </div>
    )
  });
  const symptomItemList = symptomList.map((symptom, index) => {
    const { symptomName } = symptom.toJS();
    return (
      <div className={cx('profile-spec-item-wrapper', 'symptom')} key={index}>
        <SpecItem
          type={'symptom'}
          nameKr={symptomName}
        />
      </div>
    )
  });

  return (
    <div className={cx('profile-spec')}>
      <div className={cx('profile-spec-title', 'top')}>진단명</div>
      <hr className={cx('profile-spec-hr')}/>
      <div className={cx('profile-spec-item-list-wrapper')}>
        {diagnosisItemList}
      </div>
      <div className={cx('profile-spec-title')}>처방약</div>
      <hr className={cx('profile-spec-hr')}/>
      <div className={cx('profile-spec-item-list-wrapper')}>
        {medicineItemList}
      </div>
      <div className={cx('profile-spec-title')}>증상</div>
      <hr className={cx('profile-spec-hr')}/>
      <div className={cx('profile-spec-item-list-wrapper')}>
        {symptomItemList}
      </div>
    </div>
  )
};

export default ProfileSpec;