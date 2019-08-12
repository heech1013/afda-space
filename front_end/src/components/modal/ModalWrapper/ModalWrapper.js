import React from 'react';
import styles from './ModalWrapper.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const ModalWrapper = ({children, visible}) => {
  if (!visible) return null;
  return (
    <div>
      <div className={cx('gray-background')}/>
      <div className={cx('modal-wrapper')}>
        {children}
      </div>
    </div>
  )
};

export default ModalWrapper;