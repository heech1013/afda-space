import React, { Component } from 'react';
import styles from './StationAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class StationAddModal extends Component {
  state = {
    title: '',
    body: '',
    frontError: ''
  }

  handleInputChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render() {
    const { state, handleInputChange } = this;
    const { title, body, frontError } = this.state;
    const { visible, onCancel, onSubmit } = this.props;

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('station-add-modal')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>제목</div>
          <input className={cx('station-title')} name="title" value={title} onChange={handleInputChange}/>
          <div className={cx('question')}>본문</div>
          <textarea className={cx('station-body')} name="body" value={body} onChange={handleInputChange}/>

          {/** front단 에러 */}
          { frontError && <div className={cx('error')}>{frontError}</div>}
          <div className={cx('station-add-button')}>
            <Button onClick={() => {
              if (!title) this.setState({ frontError: "제목을 입력해주세요."});
              else if (!body) this.setState({ frontError: "본문을 입력해주세요."});
              else {
                onSubmit({ state });
                this.setState({ title: '', body: '', frontError: '' });
              }
            }}>등록</Button>
          </div>
        </div>
      </ModalWrapper>
    )
  }
}

export default StationAddModal;