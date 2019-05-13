import React from 'react';
import styles from './AddCenterModal.scss';
import classNames from 'classnames/bind';

import ModalWrapper from 'components/modal/ModalWrapper';

const cx = classNames.bind(styles);

const AddCenterModal = () => (
  <ModalWrapper>
    <div className={cx('form')}>

    </div>
  </ModalWrapper>
);

export default AddCenterModal;