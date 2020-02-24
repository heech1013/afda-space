import React from 'react';
import styles from './DiagnosisMedicineChart.scss';
import classNames from 'classnames/bind';

import 'tui-chart/dist/tui-chart.css'
import { ColumnChart } from '@toast-ui/react-chart';
import TuiChart from 'tui-chart';

const cx = classNames.bind(styles);

const DiagnosisMedicineChart = ({chartData}) => {
  const { nameKr, medicineArr, effectMajorArr, effectModerateArr, effectSlightArr, effectNoneArr, effectCanNotTellArr, sideEffectSevereArr, sideEffectModerateArr, sideEffectMildArr, sideEffectNoneArr } = chartData.toJS();
  const data = {
    categories: medicineArr,  // 상위 10개 항목: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
    series: [
      { name: '효과 - 크다',        stack: '효과',   data: effectMajorArr },  // ex: [12, 64, 32, 25, 34, 52, 8, 34, 52, 11]
      { name: '부작용 - 심각하다',  stack: '부작용', data: sideEffectSevereArr },  // ex: [12, 53, 75, 23, 65, 2, 56, 7, 4, 12]
      { name: '효과 - 보통',        stack: '효과',   data: effectModerateArr },  // ex: [34, 65, 74, 24, 86, 43, 12, 54, 76, 2]
      { name: '부작용 - 보통',      stack: '부작용', data: sideEffectModerateArr },  // ex: [12, 54, 85, 97, 65, 45, 3, 23, 43, 65]
      { name: '효과 - 약간 있다',   stack: '효과',   data: effectSlightArr },  // ex: [12, 54, 75, 34, 45, 74, 23, 65, 86, 25]
      { name: '부작용 - 약간 있다', stack: '부작용', data: sideEffectMildArr },  // ex: [3, 65, 76, 34, 65, 23, 76, 95, 70, 34]
      { name: '효과 - 없다',        stack: '효과',   data: effectNoneArr },  // ex: [65, 54, 34, 26, 86, 23, 56, 83, 36, 54]
      { name: '부작용 - 없다',      stack: '부작용', data: sideEffectNoneArr },  // ex: [56, 74, 23, 23, 76, 34, 6, 3, 45, 34]
      { name: '효과 - 모르겠다',    stack: '효과',   data: effectCanNotTellArr },  // ex: [65, 76, 34, 24, 65, 23, 12, 65, 86, 34]
    ]
  };
 
  const options = {
    chart: { width: 1100, height: 500 },
    series: { stackType: 'normal' },
    legend: { showCheckbox: false },
    chartExportMenu: { visible: false },
    theme: 'barTheme'
  }

  const barTheme = {
    series: {
      colors: [
        '#0BBFA7', '#38D6C1', '#8AE6D9', '#BCEBE4', '#DDF0ED',  // 효과
        '#E36468', '#EB888B', '#FFB3B5', '#FFDBDC'  // 부작용
      ]
    }
  }
  TuiChart.registerTheme('barTheme', barTheme);

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
      <div className={cx('main-title')}>{nameKr}을(를) 가진 사람들이 복용하는 처방약 비교</div>
      <div className={cx('explanation')}>평가 수 기준 상위 10개의 처방약을 비교합니다.</div>
      <hr className={cx('hr')}/>

      <div className={cx('title')}>효과/부작용</div>
        <ColumnChart
          data={data}
          options={options}
        />
    </div>
  )
};

export default DiagnosisMedicineChart; 