import React from 'react';
import styles from './DiagnosisSummaryChart.scss';
import classNames from 'classnames/bind';

import 'tui-chart/dist/tui-chart.css'
import { BarChart } from '@toast-ui/react-chart';

const cx = classNames.bind(styles);

const DiagnosisSummaryChart = () => {


  const data = {
    categories: ['<20', '20s', '30s', '40s', '50s', '60s', '70<'],
    series: [
      {
        name: '사람 수',
        data: [12, 64, 32, 25, 34, 52, 8]
      }
    ]
  };

  const options = {
    chart: {
      width: 500,
      height: 400,
    },
    yAxis: {
      title: '나이'
    },
    xAxis: {
        title: '사람 수',
        // min: 0,
        // max: 10000,
        suffix: '명'
    },
    series: {
      showLabel: true,
      allowSelect: true
    },
    legend: {
      // align: 'right'
      visible: false
    },
    chartExportMenu: {
      visible: false
    }
  }

  /** 막대 클릭 이벤트 등록
   * series의 allowSelect 활성화 후 'selectSeries' 이벤트 등록(https://github.com/nhn/tui.chart/blob/master/docs/wiki/features-series.md#getting-selection-information-of-series)
   * react용 tui-chart의 이벤트 등록 방법
   * other events: selectLegned(https://github.com/nhn/tui.chart/blob/master/docs/wiki/features-legend.md#getting-information-of-legend-when-selecting-legend)
   */
  const handleSelectSeries = (info) => {
    console.log('onSelectSeries works! :', info);
  }


  return (
    <div className={cx('frame')}>
      <div className={cx('title')}>나이</div>
      <div className={cx('explanation')}>이러이러한 그래프.</div>
      <BarChart
        className={cx('chart')}
        data={data}
        options={options}
        onSelectSeries={handleSelectSeries}
      />
    </div>
  )
};

export default DiagnosisSummaryChart; 