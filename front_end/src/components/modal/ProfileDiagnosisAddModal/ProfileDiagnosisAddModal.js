import React, { Component } from 'react';
import styles from './ProfileDiagnosisAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
// import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileDiagnosisAddModal extends Component {
  state = {

  }

  /** 추가 가능한 진단명 불러오기
   * api 부른다
   * store에 저장한다
   *    content store 그대로 쓸 수 있나? 있겠다.
   * prop으로 받아온다
   * 배열? 객체? 등으로 받아와서 map이나 foreach 등. select option으로 세우면 될 듯??
   */
  
  render() {
    const { visible, onCancel } = this.props;  // onCancle 전달해줘야 함

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div>처음으로 해당 진단명과 관련된 증상을 알아차린 것이 언제인가요?</div>
          <div>년</div>
          <input name="firstNoticeYear" type="number" min="1900" max={new Date().getFullYear()} step="1" value="" />
          <div>월 (알고 있다면 기입해주세요)</div>
          <input name="firstNoticeMonth" type="number" min="1" max="12" step="1" value="" />
          <div>일 (알고 있다면 기입해주세요)</div>
          <input name="firstNoticeDay" type="number" min="1" max="31" step="1" value="" />
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileDiagnosisAddModal;