import React, { Component } from 'react';
import styles from './ProfileMedicineDosageAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileMedicineDosageAddModal extends Component {
  state = {
    takingStatus: {
      yes: false,
      no: false
    },
    recentTakingYear: '',
    recentTakingMonth: '',
    recentTakingDay: '',
    dosageCount: '',
    dosageMg: '',
    dosageFrequency: '',
    additionalDosage: false,
  }

  handleRadioChange = (e) => {
    let obj = {}, objInside = {};
    objInside[e.target.value] = e.target.checked  // true
    obj[e.target.name] = objInside;
    this.setState(obj);
  }

  handleDateChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    if (
      (e.target.name === ('recentTakingYear' || 'firstTakingYear'))
      || (e.target.name === ('recentTakingMonth') && this.state['recentTakingYear'])  // 년도를 입력하기 전까지는 월을 입력할 수 없다.
      || (e.target.name === ('firstTakingMonth') && this.state['firstTakingYear'])
      || (e.target.name === ('recentTakingDay') && this.state['recentTakingMonth'])  // 월을 입력하기 전까지는 일자를 입력할 수 없다.
      || (e.target.name === ('firstTakingDay') && this.state['firstTakingMonth'])
    ) this.setState(obj);
  }

  handleInputChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleCheckboxChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.checked;
    this.setState(obj);
    console.log(this.state);
  }

  render() {
    const { handleRadioChange, handleDateChange, handleInputChange, handleCheckboxChange } = this;
    const {
      takingStatus, recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage
    } = this.state;
    const { visible, onCancel, onSubmit, error } = this.props;


    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>현재 해당 처방약을 복용 중이신가요?</div>
          <input type="radio" name="takingStatus" value="yes" checked={takingStatus.yes} onChange={handleRadioChange}/>예
          <input type="radio" name="takingStatus" value="no" checked={takingStatus.no} onChange={handleRadioChange}/>아니오

          { (takingStatus.yes || takingStatus.no) && <div>
            { takingStatus.yes && <div className={cx('question')}>처방약을 복용하기 시작한 것이 언제인가요?</div>}
            { takingStatus.no && <div className={cx('question')}>가장 최근에 처방약을 복용하기 시작한 것이 언제인가요?</div>  /** When did you start your most recent dosage? */ }
            {/* 날짜 input: 년, 월, 일 */}
            <input name="recentTakingYear" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={recentTakingYear} onChange={handleDateChange}/>
            <span>년   </span>
            <input name="recentTakingMonth" autoFocus type="number" min="1" max="12" step="1" value={recentTakingMonth} onChange={handleDateChange}/>
            <span>월 (알고 있다면 기입해주세요)   </span>
            <input name="recentTakingDay" autoFocus type="number" min="1" max="31" step="1" value={recentTakingDay} onChange={handleDateChange}/>
            <span>일 (알고 있다면 기입해주세요)</span>

            { takingStatus.yes && <div className={cx('question')}>현재 복용량이 어떻게 되나요?</div>}
            { takingStatus.no && <div className={cx('question')}>가장 최근 복용량이 어떻게 되나요?</div>}
            {/** dosage input */}
            수량: <input name="dosageCount" autoFocus type="number" value={dosageCount} onChange={handleInputChange}/>정(알)씩
            용량: <input name="dosageMg" autoFocus type="number" value={dosageMg} onChange={handleInputChange}/>mg/1정(1알)
            빈도: <select name="dosageFrequency" value={dosageFrequency} onChange={handleInputChange}>
              <option key={1} value={1}>매일</option>
              <option key={2} value={2}>매일 2회씩</option>
              <option key={3} value={3}>매일 3회씩</option>
              <option key={4} value={4}>매일 4회씩</option>
              <option key={5} value={5}>매일 5회씩</option>
              <option key={6} value={6}>이틀에 1회씩</option>
              <option key={7} value={7}>매주</option>
              <option key={8} value={8}>2주에 1회씩</option>
              <option key={9} value={9}>3주에 1회씩</option>
              <option key={10} value={10}>매월</option>
              <option key={11} value={11}>6주에 1회씩</option>
              <option key={12} value={12}>8주에 1회씩</option>
              <option key={13} value={13}>3개월에 1회씩</option>
              <option key={14} value={14}>12주에 1회씩</option>
              <option key={15} value={15}>6개월에 1회씩</option>
              <option key={16} value={16}>8개월에 1회씩</option>
              <option key={17} value={17}>매년</option>
              <option key={18} value={18}>딱 한 번</option>
              <option key={19} value={19}>필요할 때마다</option>
            </select>

            {/** additional dosage checkbox & input */}
            <input name="additionalDosage" type="checkbox" value={additionalDosage} onChange={handleCheckboxChange}/>필요에 따라 추가로 해당 처방약을 복용합니다.
            { additionalDosage && <input name="dosageCount" autoFocus type="number" value={dosageCount} onChange={handleInputChange}/>}
            { additionalDosage && '알(정)씩'}  {/** html과 string을 더하면 string이 되어 html 변환을 해야 하므로 html과 string을 분리한다. */}

            <div className={cx('question')}>원래 다른 처방약을 복용하다가 해당 처방약으로 바꾸게 된 것인가요?</div> {/** Did you switch to Bupropion from another treatment(s)? */}
            {/** Y/N radio */}
            
            {/** Y일 경우 */}
            <div className={cx('question')}>전에 원래 복용하던 처방약이 무엇인가요?</div>
            {/** medicine select input */}

            <div className={cx('question')}>처방약을 복용하기 시작했을 때, (전에도 복용한 경험이 있다면) 전과는 다른 복용량을 섭취하게 되었나요?</div>
            {/** Y/N radio */}

            {/** Y일 경우 */}
            <div className={cx('question')}>최초로 해당 처방약을 복용하기 시작했던 것이 언제인가요?</div>
            {/** date input */}

            <div className={cx('question')}>최초의 복용량이 어떻게 되나요?</div>
            {/** dosage input */}

            {/** 현재 해당 처방약을 복용하고 있지 않을 경우 */}
            <div className={cx('question')}>해당 처방약 복용을 그만두게 된 것이 언제인가요?</div>
            {/** date input */}

            {/** 현재 해당 처방약을 복용하고 있지 않을 경우 */}
            <div className={cx('question')}>해당 처방약 복용을 그만두게 된 이유가 무엇인가요?</div>
            {/** multiple checkbox selection input */}

            {/** other를 선택했을 경우 */}
            {/** text input */}
          </div>}
          
          {/* 에러 처리 */}
          { error && <div className={cx('error')}>{error}</div>}
        </div>
        <div>
          <br/><Button onClick={() => onSubmit({ })}>추가</Button>
        </div>
      </ModalWrapper>
    )
  }

}

export default ProfileMedicineDosageAddModal;