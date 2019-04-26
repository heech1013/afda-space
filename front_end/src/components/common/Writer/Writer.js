import React from 'react';
import styles from './Writer.scss';
import classNames from 'classnames/bind';

import Button from 'components/common/Button';

const cx = classNames.bind(styles);

const Writer = ({onChange, onInsert}) => (
  <div className={cx('writer')}>
    <textarea className={cx('input')} onChange={onChange} />
    <Button className={cx('button')} onClick={onInsert}>작성하기</Button>
  </div>
);
  

export default Writer;