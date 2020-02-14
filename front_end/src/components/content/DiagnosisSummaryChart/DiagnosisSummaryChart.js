import React from 'react';
import styles from './DiagnosisSummaryChart.scss';
import classNames from 'classnames/bind';

import 'tui-chart/dist/tui-chart.css'
import { BarChart, PieChart } from '@toast-ui/react-chart';
import TuiChart from 'tui-chart';

const cx = classNames.bind(styles);

const DiagnosisSummaryChart = ({nameKr, count}) => {
  const ageData = {
    categories: ['0-19살', '20-29살', '30-30살', '40-49살', '50-59살', '60-69살', '70살 이상'],
    series: [
      {
        name: '사람 수',
        data: [12, 64, 32, 25, 34, 52, 8]
      }
    ]
  };
  const ageAtFirstSymptomData = {
    categories: ['0-19살', '20-29살', '30-30살', '40-49살', '50-59살', '60-69살', '70살 이상'],
    series: [
      {
        name: '사람 수',
        data: [2, 32, 94, 12, 47, 30, 12]
      }
    ]
  };
  const ageOptions = {
    chart: {
      width: 1000,
      height: 400,
    },
    yAxis: {
      // title: '나이'
    },
    xAxis: {
        // title: '사람 수',
        // min: 0,
        // max: 10000,
        suffix: '명'
    },
    series: {
      showLabel: true,
      // allowSelect: true
    },
    legend: {
      // align: 'right'
      visible: false
    },
    chartExportMenu: {
      visible: false
    },
    theme: 'barTheme'
  }
  const barTheme = {
    chart: {
      // fontFamily: '맑은 고딕'
    },
    series: {
      colors: ['#FFB341']
    }
  }
  TuiChart.registerTheme('barTheme', barTheme);

  const sexData = {
    categories: ['성별'],
    series: [
        {
            name: '남자',
            data: 173
        },
        {
            name: '여자',
            data: 346
        }
    ]
  }
  const sexOptions = {
    chart: {
      width: 500,
      height: 400,
    },
    series: {
      showLabel: true,
      showLegend: true,
      labelAlign: 'center'
    },
    legend: {
      visible: false
    },
    chartExportMenu: {
      visible: false
    },
    theme: 'pieTheme'
  }
  const diagnosedData = {
    categories: ['진단여부'],
    series: [
        {
            name: '진단 받음',
            data: 421
        },
        {
            name: '진단 받지 않음',
            data: 69
        }
    ]
  }
  const diagnosedOptions = {
    chart: {
      width: 500,
      height: 400,
    },
    series: {
      showLabel: true,
      showLegend: true,
      labelAlign: 'center'
    },
    legend: {
      visible: false
    },
    chartExportMenu: {
      visible: false
    },
    theme: 'pieTheme'
  }
  const pieTheme = {
    series: {
      colors: ['#FFB341', '#FFD08A'],
      label: {
        fontWeight: 'bold',
        color: '#000000'
      }
    }
  }
  TuiChart.registerTheme('pieTheme', pieTheme);

  /** 막대 클릭 이벤트 등록
   * series의 allowSelect 활성화 후 'selectSeries' 이벤트 등록(https://github.com/nhn/tui.chart/blob/master/docs/wiki/features-series.md#getting-selection-information-of-series)
   * react용 tui-chart의 이벤트 등록 방법
   * other events: selectLegned(https://github.com/nhn/tui.chart/blob/master/docs/wiki/features-legend.md#getting-information-of-legend-when-selecting-legend)
   */
  // const handleSelectSeries = (info) => {
  //   console.log('onSelectSeries works! :', info);
  // }


  return (
    <div className={cx('frame')}>
      <div className={cx('main-title')}>아프다 스페이스에서 {nameKr}을(를) 가진 사람들은 어떤 사람들일까요?</div>
      <div className={cx('explanation')}>
        <span className={cx('count')}>{count}</span>명의 사람들이 {nameKr}을(를) 가지고 있습니다.</div>
      <hr className={cx('hr')}/>

      <div className={cx('title')}>나이</div>
        <BarChart
          data={ageData}
          options={ageOptions}
          // onSelectSeries={handleSelectSeries}
        />
      <div className={cx('title')}>첫 증상을 경험한 나이</div>
        <BarChart
          data={ageAtFirstSymptomData}
          options={ageOptions}
        />
      <div className={cx('title')}>성별</div>
      <PieChart
        data={sexData}
        options={sexOptions}
      />
      <div className={cx('title')}>진단 여부</div>
      <PieChart
        data={diagnosedData}
        options={diagnosedOptions}
      />
    </div>
  )
};

export default DiagnosisSummaryChart; 