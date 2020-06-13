import React from 'react';
import styles from './LoadingView.scss';
import className from 'classnames/bind';

import { Circle } from 'better-react-spinkit';

const cx = className.bind(styles);

const LoadingView = ({ isLoading }) => {
  if (!isLoading) return null;
  return (
    <div className={cx('loading-view')}>
      <Circle color={"#2C3F77"} size={30} />
    </div>
  );
};

export default LoadingView;