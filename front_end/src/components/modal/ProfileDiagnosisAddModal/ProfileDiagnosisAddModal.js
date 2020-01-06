import React, { Component } from 'react';
import styles from './ProfileDiagnosisAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileDiagnosisAddModal extends Component {
  state = {
    diagnosisId: 1,  // 진단명을 선택하지 않고 제출하는 예외 상황을 방지하기 위해 초깃값을 1로 설정.
    FNRadioGroup: {
      firstNoticeUnaware: false,
      firstNoticeUnknown: false
    },
    firstNoticeYear: '',
    firstNoticeMonth: '',
    firstNoticeDay: '',
    FDRadioGroup: {
      firstDiagnosedUnaware: false,
      firstDiagnosedUnknown: false
    },
    firstDiagnosedYear: '',
    firstDiagnosedMonth: '',
    firstDiagnosedDay: ''
  }

  handleDiagnosisChange = (e) => {
    /** 선택한 option의 value를 state에 저장. */
    this.setState({ diagnosisId: e.target.value })
  }

  handleDateChange = (e) => {
    /** 날짜를 입력하는 input tag의 name 값에 따라 다른 조치
     * input tag의 name은 같은 이름의 다른 변수들과 구별하기 위해 대문자만 따서 네이밍.
     */
    switch(e.target.name) {
      case 'FNY':
        /** 세 가지 선택지(날짜 입력 / Unaware / Unknown) 중 하나만 입력할 수 있다.
         * 날짜를 입력할 시 나머지 radio 값들(Unaware / Unknown)은 모두 fasle로 설정한다.
         */
        this.setState({
          FNRadioGroup: {
            firstNoticeUnaware: false,
            firstNoticeUnknown: false
          },
          firstNoticeYear: e.target.value
        });
        break;
      case 'FNM':
          const { firstNoticeYear } = this.state;
          /** 년도를 입력한 상태여야 월을 입력할 수 있다. */
          if (firstNoticeYear) this.setState({ firstNoticeMonth: e.target.value });
          break;
      case 'FND':
          const { firstNoticeMonth } = this.state;
          /** 월을 입력한 상태여야 일자를 입력할 수 있다. */
          if (firstNoticeMonth) this.setState({ firstNoticeDay: e.target.value });
          break;
      case 'FDY':
        this.setState({
          FDRadioGroup: {
            firstDiagnosedUnaware: false,
            firstDiagnosedUnknown: false
          },
          firstDiagnosedYear: e.target.value
        });
        break;
      case 'FDM':
        const { firstDiagnosedYear } = this.state;
        if (firstDiagnosedYear) this.setState({ firstDiagnosedMonth: e.target.value });
        break;
      case 'FDD':
        const { firstDiagnosedMonth } = this.state;
        if (firstDiagnosedMonth) this.setState({ firstDiagnosedDay: e.target.value })
        break;
      default:
    }
  }

  handleRadioChange = (e) => {
    /** name과 별개로(FN이든 FD이든) 공통으로 이루어지는 작업(switch문 외부의 작업들).
     * 체크한 radio value만 checked(true) 값으로 설정한다.
     * 체크한 radio value를 제외한 value가 아예 없어진다. 예를 들면 FNRadioGroup: {firstNOticeUnaware: true}로 state가 변경됨.
     * 둘 다 false일 경우(=날짜를 입력한 경우) 초기값과 동일하게 state가 전달됨.
     */
    let obj = {};
    obj[e.target.value] = e.target.checked  // true
    switch(e.target.name) {
      case 'FNRadioGroup':
        this.setState({
          FNRadioGroup: obj,
          /** 세 가지 선택지(날짜 입력 / Unaware / Unknown) 중 하나만 입력할 수 있다.
           * Unaware / Unknown을 선택할 시 날짜 input 값을 모두 비운다.
           */
          firstNoticeYear: '',
          firstNoticeMonth: '',
          firstNoticeDay: '',
        })
        break;
      case 'FDRadioGroup':
        this.setState({
          FDRadioGroup: obj,
          firstDiagnosedYear: '',
          firstDiagnosedMonth: '',
          firstDiagnosedDay: '',
        })
        break;
      default:
    }
  }

  render() {
    const { diagnosisId, FNRadioGroup, firstNoticeYear, firstNoticeMonth, firstNoticeDay, FDRadioGroup, firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay } = this.state;
    const { visible, diagnosisList, onCancel, onSubmit } = this.props;
    const { state, handleDiagnosisChange, handleRadioChange, handleDateChange } = this;

    /** 존재하는 진단명 리스트를 조회하여 select의 option list를 생성한다. */
    const diagnosisOptionList = diagnosisList.map((diagnosis) => {
      const { fkDiagnosisId: id } = diagnosis.toJS();  // diagnosis의 id
      const { nameKr } = diagnosis.toJS().RegisteredDiagnosisData;
      return <option key={id} value={id}>{nameKr}</option>
    });

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div> {/** onCancel is not a function */}
          <div>추가하려는 진단명을 선택해주세요.</div>
          <select name="diagnosis" value={diagnosisId} onChange={handleDiagnosisChange}>{diagnosisOptionList}</select>

          <div>처음으로 해당 진단명과 관련된 증상을 알아차린 것이 언제인가요?</div>
          {/* 날짜 input: 년, 월, 일 */}
          <input name="FNY" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={firstNoticeYear} onChange={handleDateChange}/>
          <span>년</span>
          <input name="FNM" autoFocus type="number" min="1" max="12" step="1" value={firstNoticeMonth} onChange={handleDateChange}/>
          <span>월 (알고 있다면 기입해주세요)</span>
          <input name="FND" autoFocus type="number" min="1" max="31" step="1" value={firstNoticeDay} onChange={handleDateChange}/>
          <span>일 (알고 있다면 기입해주세요)</span>
          {/* radio group: Unaware, Unknown */}
          <input type="radio" name="FNRadioGroup" value="firstNoticeUnaware" checked={FNRadioGroup['firstNoticeUnaware']} onChange={handleRadioChange}/>증상을 전혀 알아채지 못했습니다.
          <input type="radio" name="FNRadioGroup" value="firstNoticeUnknown" checked={FNRadioGroup['firstNoticeUnknown']} onChange={handleRadioChange}/>잘 모르겠습니다.

          <div>전문가(전문의, 임상심리전문가 등)로부터 해당 진단명을 진단 받은 것이 언제인가요?</div>
          {/* 날짜 input: 년, 월, 일 */}
          <input name="FDY" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={firstDiagnosedYear} onChange={handleDateChange}/>
          <span>년</span>
          <input name="FDM" autoFocus type="number" min="1" max="12" step="1" value={firstDiagnosedMonth} onChange={handleDateChange}/>
          <span>월 (알고 있다면 기입해주세요)</span>
          <input name="FDD" autoFocus type="number" min="1" max="31" step="1" value={firstDiagnosedDay} onChange={handleDateChange}/>
          <span>일 (알고 있다면 기입해주세요)</span>
          {/* radio group: Unaware, Unknown */}
          <input type="radio" name="FDRadioGroup" value="firstDiagnosedUnaware" checked={FDRadioGroup['firstDiagnosedUnaware']} onChange={handleRadioChange}/>진단을 받은 적은 없지만, 제 생각엔 해당 증상명을 가지고 있는 것 같습니다.
          <input type="radio" name="FDRadioGroup" value="firstDiagnosedUnknown" checked={FDRadioGroup['firstDiagnosedUnknown']} onChange={handleRadioChange}/>잘 모르겠습니다.
          {/* 에러 처리: 이미 추가한 진단명일 때 / 유효하지 않은 날짜일 때 */}
          <div>
            <Button onClick={() => onSubmit({ state })}>저장</Button>
          </div>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileDiagnosisAddModal;

// state:
// diagnosisId: 1
// FNRadioGroup: {firstNoticeUnaware: true}
// firstNoticeYear: ""
// firstNoticeMonth: ""
// firstNoticeDay: ""
// FDRadioGroup: {firstDiagnosedUnknown: true}
// firstDiagnosedYear: ""
// firstDiagnosedMonth: ""
// firstDiagnosedDay: ""