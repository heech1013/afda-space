import React, { Component } from 'react';
import styles from './ProfileMedicineAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileMedicineAddModal extends Component {
  state = {
    medicineId: 1  // 처방약을 선택하지 않고 제출하는 예외 상황을 방지하기 위해 초깃값을 1로 설정.
  }

  handleMedicineChange = (e) => {
    /** 선택한 option의 value를 state에 저장. */
    this.setState({ medicineId: e.target.value })
  }

  render() {
    const { handleMedicineChange } = this;
    const { medicineId } = this.state;
    const { visible, medicineList, onCancel, onSubmit, error } = this.props;

    /** 존재하는 처방약 리스트를 조회하여 select의 option list를 생성한다. */
    const medicineOptionList = medicineList.map((medicine) => {
      const { fkMedicineId: id } = medicine.toJS();
      const { nameKr } = medicine.toJS().RegisteredMedicinePurposeData;
      return <option key={id} value={id}>{nameKr}</option>
    });

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>추가하려는 처방약을 선택해주세요.</div>
          <select name="medicine" value={medicineId} onChange={handleMedicineChange}>{medicineOptionList}</select>
          {/* 에러 처리: 이미 추가한 처방약일 때 */}
          { error && <div className={cx('error')}>{error}</div>}
        </div>
        <div>
          <br/><Button onClick={() => onSubmit({ medicineId })}>추가</Button>
        </div>
      </ModalWrapper>
    )
  }

}

export default ProfileMedicineAddModal;