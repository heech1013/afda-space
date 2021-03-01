import React from 'react';
import styles from './DiagnosisSummaryChart.scss';
import classNames from 'classnames/bind';

import 'tui-chart/dist/tui-chart.css'
import { BarChart, PieChart } from '@toast-ui/react-chart';
import TuiChart from 'tui-chart';

const cx = classNames.bind(styles);

const DiagnosisSummaryChart = ({chartData}) => {
  const {
    nameKr, count, ageArr, menVal, womenVal, diagnosedVal, undiagnosedVal
  } = chartData.toJS();

  /** 나이 */
  const ageData = {
    categories: ['0-19살', '20-29살', '30-30살', '40-49살', '50-59살', '60-69살', '70살 이상'],
    series: [{
      name: '사람 수',
      data: ageArr  // ex: [12, 64, 32, 25, 34, 52, 8]
    }]
  };

  /** 첫 증상을 경험한 나이. */
  // const ageAtFirstSymptomData = {
  //   categories: ['0-19살', '20-29살', '30-30살', '40-49살', '50-59살', '60-69살', '70살 이상'],
  //   series: [{
  //     name: '사람 수',
  //     data: ageAtFirstSymptomArr  // ex: [2, 32, 94, 12, 47, 30, 12]
  //   }]
  // };

  /** bar chart(나이, 첫 증상을 경험한 나이) 용 option, theme */
  const barOptions = {
    chart: { width: 1000, height: 400 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }
  const barTheme = { series: { colors: ['#FFB341']}}
  TuiChart.registerTheme('barTheme', barTheme);

  /** PieChart
   * barChart와 다르게 데이터를 받아오기 전 undefined가 전달되면 map을 돌리다가 오류가 남.
   * 이를 방지하기 위해 데이터를 받아오는 동안은 0을 전달. 데이터가 전달되고 나면 정상 생성됨.
   */
  /** 성별 */
  const sexData = {
    categories: ['성별'],
    series: [
      { name: '남자', data: menVal },  // ex: 324
      { name: '여자', data: womenVal }  // ex: 532
    ]
  }
  const sexOptions = {
    chart: { width: 500, height: 400 },
    series: { showLabel: true, showLegend: true, labelAlign: 'center' },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'pieTheme'
  }

  /** 진단 여부 */
  const diagnosedData = {
    categories: ['진단여부'],
    series: [
      { name: '진단 받음', data: diagnosedVal },  // ex: 324
      { name: '진단 받지 않음', data: undiagnosedVal }  // ex: 124
    ]
  }
  const diagnosedOptions = {
    chart: { width: 500, height: 400 },
    series: { showLabel: true, showLegend: true, labelAlign: 'center' },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'pieTheme'
  }

  /** pie chart용(성별, 진단 여부) theme */
  const pieTheme = {
    series: {
      colors: ['#FFB341', '#FFD08A'],
      label: { fontWeight: 'bold', color: '#000000' }
    }
  }
  TuiChart.registerTheme('pieTheme', pieTheme);

  /** 막대 클릭 이벤트 등록
   * series의 allowSelect 활성화 후 'selectSeries' 이벤트 등록(https://github.com/nhn/tui.chart/blob/master/docs/wiki/features-series.md#getting-selection-information-of-series)
   * react용 tui-chart의 이벤트 등록 방법
   * other events: selectLegned(https://github.com/nhn/tui.chart/blob/master/docs/wiki/features-legend.md#getting-information-of-legend-when-selecting-legend)
   */

  return (
    <div className={cx('frame')}>
      <div className={cx('main-title')}>아프다 스페이스에서 {nameKr}을(를) 가진 사람들은 어떤 사람들일까요?</div>
      <div className={cx('explanation')}>
        <span className={cx('count')}>{count}</span>명의 사람들이 {nameKr}을(를) 가지고 있습니다.
      </div>
      <hr className={cx('hr')}/>

      <div className={cx('title')}>나이</div>
        <BarChart
          data={ageData}
          options={barOptions}
        />
      {/* <div className={cx('title')}>첫 증상을 경험한 나이</div>
        <BarChart
          data={ageAtFirstSymptomData}
          options={barOptions}
        /> */}
      <div className={cx('title')}>성별</div>
      { 
        (
          (sexData["series"][0]["data"] && sexData["series"][1]["data"])  // store로부터 어떤 데이터를 받아 온 상태이고
          && !((sexData["series"][0]["data"] === 0) && (sexData["series"][1]["data"] === 0))  // 두 val 모두 0이 아닐 때
        ) ?
          <PieChart
          data={sexData}
          options={sexOptions}
          /> : '등록된 데이터가 없습니다.'
      }
      <div className={cx('title')}>진단 여부</div>
      { 
        (
          (diagnosedData["series"][0]["data"] && diagnosedData["series"][1]["data"])  // store로부터 어떤 데이터를 받아 온 상태이고
          && !((diagnosedData["series"][0]["data"] === 0) && (diagnosedData["series"][1]["data"] === 0))  // 두 val 모두 0이 아닐 때
        ) ?
          <PieChart
          data={diagnosedData}
          options={diagnosedOptions}
          /> : '등록된 데이터가 없습니다.'
      }
    </div>
  )
};

export default DiagnosisSummaryChart; 