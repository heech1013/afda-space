import React from 'react';
import styles from './MedicineSummaryChart.scss';
import classNames from 'classnames/bind';

import 'tui-chart/dist/tui-chart.css'
import { BarChart } from '@toast-ui/react-chart';
import TuiChart from 'tui-chart';

const cx = classNames.bind(styles);

const MedicineSummaryChart = ({chartData}) => {
  const {
    nameKr,
    purposeArr, effectMajorArr, effectModerateArr, effectSlightArr, effectNoneArr, effectCanNotTellArr,
    sideEffectArr,
    sideEffectRankArr, sideEffectRankCountArr,
    // dosageArr, dosageCountArr,
    reasonOfStopArr,
    // durationNowCountArr,
    // durationExCountArr,
    adherenceCountArr,
    burdenCountArr,
    costCountArr,
    switchFromArr, switchFromCountArr,
    switchToArr, switchToCountArr
  } = chartData.toJS();

  const purposeData = {  // purpose & perceived effectiveness data
    categories: purposeArr,  // ex: ['A', 'B', 'C', 'D', 'E']
    series: [
      { name: '크다',      data: effectMajorArr },  // ex: [12, 64, 34, 52, 8]
      { name: '보통',      data: effectModerateArr },  // ex: [34,63,23,12,54]
      { name: '약간 있다', data: effectSlightArr },  // ex: [16,35,86,46,8]e
      { name: '없다',      data: effectNoneArr },  // ex: [4,35,2,76,3]
      { name: '모르겠다',  data: effectCanNotTellArr },  // ex: [1,5,7,4,12]
    ]
  };
  const purposeOptions = {
    chart: { width: 1000, height: 300 },
    xAxis: { suffix: '명' },
    series: { stackType: 'normal', showLabel: true },
    legend: { showCheckbox: false },
    chartExportMenu: { visible: false },
    theme: 'purposeTheme'
  }
  const purposeTheme = {
    series: {
      colors: ['#0BBFA7', '#38D6C1', '#8AE6D9', '#BCEBE4', '#DDF0ED']
    }
  }
  TuiChart.registerTheme('purposeTheme', purposeTheme);

  const sideEffectData = {
    categories: ['심각하다', '보통', '약간 있다', '없다'],
    series: [
      { name: '평가 수', data: sideEffectArr }  // ex: [12, 64, 32, 25]
    ]
  };
  const sideEffectOptions = {
    chart: { width: 1000, height: 200 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'sideEffectTheme'
  }
  const sideEffectTheme = {
    series: {
      colors: ['#E36468']
    }
  }
  TuiChart.registerTheme('sideEffectTheme', sideEffectTheme);

  const sideEffectRankData = {
    categories: sideEffectRankArr,  // ex: ['A', 'B', 'C', 'D', 'E']
    series: [{ name: '평가 수', data: sideEffectRankCountArr }]  // ex: [93, 83, 62, 45, 23]
  };
  const sideEffectRankOptions = {
    chart: { width: 1000, height: 300 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  // const dosageData = {
  //   categories: dosageArr,  // ex: ['A', 'B', 'C', 'D', 'E']
  //   series: [{ name: '사람 수', data: dosageCountArr }]  // ex: [93, 83, 62, 45, 23]
  // };
  // const dosageOptions = {
  //   chart: { width: 1000, height: 300 },
  //   xAxis: { suffix: '명' },
  //   series: { showLabel: true },
  //   legend: { visible: false },
  //   chartExportMenu: { visible: false },
  //   theme: 'barTheme'
  // }

  const reasonOfStopData = {
    categories: ['효과가 없는 것 같아서', '가격이 비싸서', '개인적인 판단 하에', '전문가의 권유로', '부작용이 너무 심해서', '치료 과정이 모두 마무리 되어서', '기타'],
    series: [{ name: '사람 수', data: reasonOfStopArr }] // ex: [93, 83, 62, 45, 23, 12, 6]
  };
  const reasonOfStopOptions = {
    chart: { width: 1000, height: 400 },  
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  // const durationNowData = {
  //   categories: ['1개월 미만', '1 ~ 6개월', '6 ~ 12개월', '1 ~ 2년', '2 ~ 5년', '5 ~ 10년', '10년 이상'],
  //   series: [{ name: '사람 수', data: durationNowCountArr }]  // ex: [93, 83, 62, 45, 23, 12, 6]
  // };
  // const durationNowOptions = {
  //   chart: { width: 1000, height: 400 },
  //   xAxis: { suffix: '명' },
  //   series: { showLabel: true },
  //   legend: { visible: false },
  //   chartExportMenu: { visible: false },
  //   theme: 'barTheme'
  // }

  // const durationExData = {
  //   categories: ['1개월 미만', '1 ~ 6개월', '6 ~ 12개월', '1 ~ 2년', '2 ~ 5년', '5 ~ 10년', '10년 이상'],
  //   series: [{ name: '사람 수', data: durationExCountArr }]  // ex: [93, 83, 62, 45, 23, 12, 6]
  // };
  // const durationExOptions = {
  //   chart: { width: 1000, height: 400 },
  //   xAxis: { suffix: '명' },
  //   series: { showLabel: true },
  //   legend: { visible: false },
  //   chartExportMenu: { visible: false },
  //   theme: 'barTheme'
  // }

  const adherenceData = {
    categories: ['항상 따른다', '대부분 따른다', '가끔 따른다', '전혀 따르지 않는다'],
    series: [{ name: '사람 수', data: adherenceCountArr }]  // ex: [93, 83, 62, 45]
  };
  const adherenceOptions = {
    chart: { width: 1000, height: 200 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  const burdenData = {
    categories: ['매우 힘들다', '어느 정도 힘들다', '약간 힘들다', '전혀 힘들지 않다'],
    series: [{ name: '사람 수', data: burdenCountArr }]  // ex: [3, 6, 8, 23]
  };
  const burdenOptions = {
    chart: { width: 1000, height: 200 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  const costData = {
    categories: ['10만 원 이상', '5 ~ 9만 원', '2 ~ 4만 원', '1만 원 이하'],
    series: [{ name: '평가 수', data: costCountArr }]  // ex: [3, 6, 8, 23]
  };
  const costOptions = {
    chart: { width: 1000, height: 200 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  const switchFromData = {
    categories: switchFromArr,  // ex: ['A', 'B', 'C', 'D', 'E'],
    series: [{ name: '사람 수', data: switchFromCountArr }]  // ex: [93, 83, 62, 45, 23]
  };
  const switchFromOptions = {
    chart: { width: 1000, height: 300 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  const switchToData = {
    categories: switchToArr,  // ex: ['A', 'B', 'C', 'D', 'E'],
    series: [{ name: '사람 수', data: switchToCountArr }]  // ex: [93, 83, 62, 45, 23]
  };
  const switchToOptions = {
    chart: { width: 1000, height: 300 },
    xAxis: { suffix: '명' },
    series: { showLabel: true },
    legend: { visible: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  const barTheme = {
    series: {
      colors: ['#FFB341']
    }
  }
  TuiChart.registerTheme('barTheme', barTheme);

  return (
    <div className={cx('frame')}>
      <div className={cx('title')}>처방 목적 & 인지된 효과</div>
      <div className={cx('explanation')}>평가 수 기준 상위 5개 항목(처방 목적이 진단명인 경우에 한하여)</div>
      <div className={cx('chart')}>
        <BarChart
          data={purposeData}
          options={purposeOptions}
        />
      </div>

      <div className={cx('title')}>부작용</div>
      <div className={cx('explanation')}>전반적인 부작용에 대한 평가</div>
      <div className={cx('chart')}>
        <BarChart
          data={sideEffectData}
          options={sideEffectOptions}
        />
      </div>

      <div className={cx('title')}>부작용 증상</div>
      <div className={cx('explanation')}>주로 나타나는 진단명/증상</div>
      <div className={cx('chart')}>
        <BarChart
          data={sideEffectRankData}
          options={sideEffectRankOptions}
        />
      </div>

      {/* <div className={cx('title')}>복용량</div>
      <div className={cx('explanation')}>현재 복용 중인 사람 수 기준 상위 5개 항목</div>
      <div className={cx('chart')}>
        <BarChart
          data={dosageData}
          options={dosageOptions}
        />
      </div> */}

      <div className={cx('title')}>복용을 그만 둔 이유</div>
      <div className={cx('explanation')}>(복수 선택 가능)</div>
      <div className={cx('chart')}>
        <BarChart
          data={reasonOfStopData}
          options={reasonOfStopOptions}
        />
      </div>

      {/* <div className={cx('title')}>복용 기간</div>
      <div className={cx('explanation')}>현재 복용 중인 사람 수 기준</div>
      <div className={cx('chart')}>
        <BarChart
          data={durationNowData}
          options={durationNowOptions}
        />
      </div>

      <div className={cx('title')}>복용 기간</div>
      <div className={cx('explanation')}>복용을 그만 둔 사람 수 기준</div>
      <div className={cx('chart')}>
        <BarChart
          data={durationExData}
          options={durationExOptions}
        />
      </div> */}

      <div className={cx('title')}>순응도</div>
      <div className={cx('explanation')}>순응도: 전문가/의료진의 권고대로 약을 복용하는 정도</div>
      <div className={cx('chart')}>
        <BarChart
          data={adherenceData}
          options={adherenceOptions}
        />
      </div>

      <div className={cx('title')}>복용 부담</div>
      <div className={cx('explanation')}>약을 복용하는 데 개인이 느끼는 신체적, 정신적 부담</div>
      <div className={cx('chart')}>
        <BarChart
          data={burdenData}
          options={burdenOptions}
        />
      </div>

      <div className={cx('title')}>비용</div>
      <div className={cx('explanation')}>(한달 기준)</div>
      <div className={cx('chart')}>
        <BarChart
          data={costData}
          options={costOptions}
        />
      </div>

      <div className={cx('title')}>처방약 변경</div>
      <div className={cx('explanation')}>사람들은 아래 처방약 복용을 그만 둔 뒤 {nameKr}을 복용하기 시작했습니다.</div>
      <div className={cx('chart')}>
        <BarChart
          data={switchFromData}
          options={switchFromOptions}
        />
      </div>

      <div className={cx('title')}>처방약 변경</div>
    <div className={cx('explanation')}>사람들은 {nameKr} 복용을 그만 둔 뒤 아래 처방약을 복용하기 시작했습니다.</div>
      <div className={cx('chart')}>
        <BarChart
          data={switchToData}
          options={switchToOptions}
        />
      </div>
    </div>
  )
};

export default MedicineSummaryChart; 