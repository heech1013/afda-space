import React, { Component } from 'react';
import styles from './ProfileMedicinePurposeAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileMedicinePurposeAddModal extends Component {
  state = {
    contentId: '',
    purposeRadio: {
      diagnosis: false,
      symptom: false
    },
    diagnosisId: 1,  // 증상을 선택하지 않고 제출하는 예외 상황을 방지하기 위해 초깃값을 1로 설정.
    symptomId: 1,
    frontError: ''
  }

  handleRadioChange = (e) => {
    let obj = {}, objInside = {};
    objInside[e.target.value] = e.target.checked  // true
    obj[e.target.name] = objInside;
    this.setState(obj);
  }

  handleInputChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render() {
    const { state, handleRadioChange, handleInputChange } = this;
    const { purposeRadio, diagnosisId, symptomId, frontError } = this.state;
    const { visible, diagnosisList, symptomList, onCancel, onSubmit } = this.props;

    /** 존재하는 진단명 리스트를 조회하여 select의 option list를 생성한다. */
    const diagnosisOptionList = diagnosisList.map((diagnosis) => {
      const { id, nameKr } = diagnosis.toJS();  // diagnosis의 id, nameKr
      return <option key={id} value={id}>{nameKr}</option>
    });
    /** 존재하는 증상 리스트를 조회하여 select의 option list를 생성한다. */
    const symptomOptionList = symptomList.map((symptom) => {
      const { id, nameKr } = symptom.toJS();
      return <option key={id} value={id}>{nameKr}</option>
    });

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>처방 목적을 선택해주세요.</div>
          <input type="radio" name="purposeRadio" value="diagnosis" checked={purposeRadio.diagnosis} onChange={handleRadioChange}/>진단명
          <input type="radio" name="purposeRadio" value="symptom" checked={purposeRadio.symptom} onChange={handleRadioChange}/>증상
          <br/><br/>
          { purposeRadio.diagnosis ? <select name="diagnosisId" value={diagnosisId} onChange={handleInputChange}>{diagnosisOptionList}</select> : null }
          { purposeRadio.symptom ? <select name="symptomId" value={symptomId} onChange={handleInputChange}>{symptomOptionList}</select> : null }
          {/** front단 에러 */}
          { frontError && <div className={cx('error')}>{frontError}</div>}
          {/* 에러 처리 생략: 목적을 등록할 경우 더 이상의 목적을 등록할 수 없기 때문에 중복 체크 등을 할 필요가 없다. 추후 복수 등록 가능으로 확장 시 필요. */}
          <div>
            <br/><Button onClick={() => {
              if (!purposeRadio.diagnosis && !purposeRadio.symptom) {  // 아무 것도 선택하지 않은 경우
                this.setState({ frontError: '처방 목적을 선택하세요.' });
              } else onSubmit({state});
            }}>저장</Button>
          </div>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileMedicinePurposeAddModal;