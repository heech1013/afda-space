import React, { Component } from 'react';
import styles from './ProfileDiagnosisAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileDiagnosisAddModal extends Component {
  state = {

  }


  
  render() {
    const { visible } = this.props;
    let yearSelectList = "";
    for (let i = new Date().getFullYear(); i > 1909; i--) {
      yearSelectList += ("<option value='" + i + "'>" + i + "</option>");
      // 문제: 맨 마지막 단락만 추가가 됨 + 따옴표로 인해 STRING으로  들어감.
    }

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <select>{yearSelectList}</select>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileDiagnosisAddModal;