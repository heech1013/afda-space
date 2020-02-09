import React from 'react';
import styles from './DiagnosisSummaryGraph.scss';
import classNames from 'classnames/bind';

import 'tui-chart/dist/tui-chart.css'
import { BarChart } from '@toast-ui/react-chart';

const cx = classNames.bind(styles);

const DiagnosisSummaryGraph = () => {

  
  const data = {
    category: ['<20', '20s', '30s', '40s', '50s', '60s', '70<'],
    series: [
      {
        name: '사람 수',
        data: [12, 64, 32, 25, 34, 52, 8]
      }
    ]
  };

  const option = {
    chart: {
      width: 700,
      height: 400,
    },
    yAxis: {
      title: '나이'
    },
    xAxis: {
        title: '사람 수',
        min: 0,
        max: 10000,
        suffix: '명'
    },
    series: {
      showLabel: true
    }
  }

  

  return (
    <div className={cx('frame')}>
      <div className={cx('title')}>나이</div>
      <BarChart
        className={cx('chart')}
        data={data}
        option={option}
      />
    </div>
  )
};

export default DiagnosisSummaryGraph;