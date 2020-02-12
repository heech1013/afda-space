import React from 'react';
import styles from './BarChart.scss';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const BarChart = ({
  title, explanation
}) => {

  return (
    <div clasasName={cx('chart')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('explanation')}>{explanation}</div>
    </div>
  )
};

export default BarChart;