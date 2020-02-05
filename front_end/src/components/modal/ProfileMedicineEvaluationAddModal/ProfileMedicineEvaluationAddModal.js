import React, { Component } from 'react';
import styles from './ProfileMedicineEvaluationAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileMedicineEvaluationAddModal extends Component {
  state = {
    contentId: '',
    
    frontError: ''
  }

  handleOptionChange = (e) => {
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

  handleCheckboxChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.checked;
    this.setState(obj);
  }

  render() {
    const { state, handleOptionChange, handleInputChange, handleCheckboxChange } = this;
    const {
      frontError
    } = this.state;
    const { visible, onCancel, onSubmit, error } = this.props;

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          
          {/** front단 에러 */}
          { frontError && <div className={cx('error')}>{frontError}</div>}
          {/* 에러 처리 */}
          { error && <div className={cx('error')}>{error}</div>}
        </div>
        <div>
          <br/>
          <Button onClick={() => {
            onSubmit({ state });
            /** 제출 후 form 빈칸으로 초기화 */
          }}>추가</Button>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileMedicineEvaluationAddModal;