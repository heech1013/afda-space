import React, { Component } from 'react';
import styles from './ProfileDiagnosisAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileDiagnosisAddModal extends Component {

  render() {
    const { visible } = this.props;
    return (
      <ModalWrapper visible={visible}>

      </ModalWrapper>
    )
  }
}

export default ProfileDiagnosisAddModal;