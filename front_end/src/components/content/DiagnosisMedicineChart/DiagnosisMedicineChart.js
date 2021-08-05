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
      { name: '부작용 - 심각하다',  stack: '부작용', data: sideEffectSevereArr },
      { name: '효과 - 보통',        stack: '효과',   data: effectModerateArr },
      { name: '부작용 - 보통',      stack: '부작용', data: sideEffectModerateArr },
      { name: '효과 - 약간 있다',   stack: '효과',   data: effectSlightArr },
      { name: '부작용 - 약간 있다', stack: '부작용', data: sideEffectMildArr },
      { name: '효과 - 없다',        stack: '효과',   data: effectNoneArr },
      { name: '부작용 - 없다',      stack: '부작용', data: sideEffectNoneArr },
      { name: '효과 - 모르겠다',    stack: '효과',   data: effectCanNotTellArr },
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

  return (
    <div className={cx('frame')}>
      <div className={cx('main-title')}>{nameKr}을(를) 가진 사람들이 복용하는 처방약 비교</div>
      <div className={cx('explanation')}>평가 수 기준 상위 10개의 처방약을 비교합니다.</div>
      <hr className={cx('hr')}/>

      <div className={cx('title')}>효과/부작용</div>
        { ( data["categories"] && data["categories"].length ) ?  // store로부터 어떤 데이터를 받아 왔고, 그 데이터의 카테고리 배열에 길이가 있을 때
          <ColumnChart
            data={data}
            options={options}
          /> : '등록된 데이터가 없습니다.'
        }
    </div>
  )
};

export default DiagnosisMedicineChart; 