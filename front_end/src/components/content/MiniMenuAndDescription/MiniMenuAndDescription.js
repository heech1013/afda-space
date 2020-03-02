import React from 'react';
import styles from './MiniMenuAndDescription.scss';
import classNames from 'classnames/bind';

import MiniMenu from 'components/common/MiniMenu';
import DescriptionContainer from 'containers/content/DescriptionContainer';

const cx = classNames.bind(styles);

const MiniMenuAndDescription = ({buttonArr, type, id}) => (
  <div className={cx('MiniMenuAndDescription')}>
    <MiniMenu buttonArr={buttonArr}/>
    <DescriptionContainer
      type={type}
      id={id}/>
  </div>
);

export default MiniMenuAndDescription;