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
    const { onSubmit } = this.props;
    const { body, frontError } = state;

    return (
      <div className={cx('writer')}>
        <textarea className={cx('writer-input')} onChange={handleInputChange}/>
        
        {/** front단 에러 */}
        { frontError && <div className={cx('error')}>{frontError}</div> }

        <div className={cx('writer-button')}>
          <Button onClick={() => {
            if (body === '') this.setState({ frontError: '' })
            else {
              onSubmit(body);
              this.setState({ body: '', frontError: '' });
            }
          }}>작성하기</Button>
        </div>
      </div>
    )
  }
}

export default Writer;