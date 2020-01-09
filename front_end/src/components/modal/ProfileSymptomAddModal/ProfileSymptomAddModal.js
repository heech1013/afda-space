import React, { Component } from 'react';
import styles from './ProfileSymptomAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileSymptomAddModal extends Component {
  state = {
    symptomId: 1  // 증상을 선택하지 않고 제출하는 예외 상황을 방지하기 위해 초깃값을 1로 설정.
  }

  handleSymptomChange = (e) => {
    /** 선택한 option의 value를 state에 저장. */
    this.setState({ symptomId: e.target.value });
  }

  render() {
    const { handleSymptomChange } = this;
    const { symptomId } = this.state;
    const { visible, symptomList, onCancel, onSubmit, error } = this.props;

    /** 존재하는 증상 리스트를 조회하여 select의 option list를 생성한다. */
    const symptomOptionList = symptomList.map((symptom) => {
      const { id, nameKr } = symptom.toJS();
      return <option key={id} value={id}>{nameKr}</option>
    });

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>추가하려는 증상을 선택해주세요.</div>
            <select name="symptom" value={symptomId} onChange={handleSymptomChange}>{symptomOptionList}</select>
          {/* 에러 처리: 이미 추가한 증상일 때 */}
          { error && <div className={cx('error')}>{error}</div>}
          <div>
            <br/><Button onClick={() => onSubmit(symptomId)}>저장</Button>
          </div>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileSymptomAddModal;