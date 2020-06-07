import React, { Component } from 'react';
import styles from './Writer.scss';
import classNames from 'classnames/bind';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class Writer extends Component {
  state = {
    body: '',
    frontError: null
  }

  handleInputChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  render() {
    const { state, handleInputChange } = this;
    const { type, logged, onSubmit } = this.props;
    const { body, frontError } = state;

    return (
      <div className={cx('writer', type)}>
        <textarea className={cx('writer-input')} name={'body'} type='text' value={body} onChange={handleInputChange}/>
        
        {/** front단 에러 */}
        { frontError && <div className={cx('error')}>{frontError}</div> }

        <div className={cx('writer-button')}>
          <Button onClick={() => {
            if (!logged) this.setState({ frontError: '로그인이 필요합니다.'});
            else if (body === '') this.setState({ frontError: '내용을 입력해주세요.' });
            else {
              onSubmit({state});
              this.setState({ body: '', frontError: '' });
            }
          }}>{
            (type === 'station') ? '답변 작성하기'
              : (type === 'newspeed') ? '글 작성하기' : null
          }</Button>
        </div>
      </div>
    )
  }
}

export default Writer;