import React, { Component } from 'react';
import styles from './ProfileMedicinePurposeAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileMedicinePurposeAddModal extends Component {
  state = {
    purposeRadio: {
      diagnosis: false,
      symptom: false
    },
    diagnosisId: 1,  // 증상을 선택하지 않고 제출하는 예외 상황을 방지하기 위해 초깃값을 1로 설정.
    symptomId: 1
  }

  handleRadioChange = (e) => {
    const { onRequest } = this.props;
    let obj = {}, objInside = {};
    objInside[e.target.value] = e.target.checked  // true
    obj[e.target.name] = objInside;
    this.setState(obj);
    onRequest(e.target.value);
  }

  handleInputChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render() {
    const { state, handleRadioChange, handleInputChange } = this;
    const { purposeRadio, diagnosisId, symptomId } = this.state;
    const { visible, purposeList = null, onCancel, onRequest, onSubmit } = this.props;

    /** 존재하는 진단명/증상명 리스트를 조회하여 select의 option list를 생성한다. */
    let purposeOptionList;
    if (purposeList) {  // props로 contentList가 넘어
      purposeOptionList = purposeList.map((purpose) => {
        const { id, nameKr } = purpose.toJS();
        return <option key={id} value={id}>{nameKr}</option>
      });
    }

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>처방 목적을 선택해주세요.</div>
          <input type="radio" name="purposeRadio" value="diagnosis" checked={purposeRadio.diagnosis} onChange={handleRadioChange}/>진단명
          <input type="radio" name="purposeRadio" value="symptom" checked={purposeRadio.symptom} onChange={handleRadioChange}/>증상
          {/* { purposeRadio.diagnosis ?
              onRequest('diagnosis')  // 진단명 옵션 리스트를 요청
              :
              purposeRadio.symptom ?
                onRequest('symptom') : null  // 증상 옵션 리스트를 요청
          } */}
          { purposeRadio.diagnosis ? <select name="diagnosisId" value={diagnosisId} onChange={handleInputChange}>{purposeOptionList}</select> : null }
          { purposeRadio.symptom ? <select name="symptomId" value={symptomId} onChange={handleInputChange}>{purposeOptionList}</select> : null }
          {/* 에러 처리 생략: 목적을 등록할 경우 더 이상의 목적을 등록할 수 없기 때문에 중복 체크 등을 할 필요가 없다. 추후 복수 등록 가능으로 확장 시 필요. */}
          <div>
            <br/><Button onClick={() => onSubmit(state)}>저장</Button>
          </div>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileMedicinePurposeAddModal;