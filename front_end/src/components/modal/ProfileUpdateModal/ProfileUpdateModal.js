import React, { Component } from 'react';
import styles from './ProfileUpdateModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileUpdateModal extends Component {
  state = {
    // nick: '',
    introduction: ''
  }

  // handleNickChange = (e) => {
  //   this.setState({
  //     nick: e.target.value
  //   });
  // }
  handleIntroductionChange = (e) => {
    this.setState({
      introduction: e.target.value
    })
  }

  render() {
    const {
      // nick,
      introduction
    } = this.state;
    const {
      // handleNickChange,
      handleIntroductionChange
    } = this;
    const { visible, onCancel, error, onSubmit } = this.props;
    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div onClick={() => onCancel()} className={cx('close')}>&times;</div>
          <div className={cx('description')}>자기소개</div>
          <input className={cx('input')} autoFocus value={introduction} onChange={handleIntroductionChange}/>
          { error && <div className={cx('error')}>{error}</div>}
          <div>
            <Button className={cx('button')} onClick={() => onSubmit({
              // nick,
              introduction
            })}>수정</Button>
          </div>
          
        </div>
      </ModalWrapper>
    );
  }
}

export default ProfileUpdateModal;