import React, { Component } from 'react';
import styles from './ProfileMedicineDosageAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileMedicineDosageAddModal extends Component {
  state = {
    contentId: '',
    takingStatus: {
      yes: false,
      no: false
    },
    recentTakingYear: '', recentTakingMonth: '', recentTakingDay: '',
    dosageCount: '', dosageMg: '', dosageFrequency: 1,
    additionalDosage: false, additionalDosageCount: '',
    switchRadio: {
      yes: false,
      no: false
    }, switchTo: 1,   // 처방약을 선택하지 않고 제출하는 예외 상황을 방지하기 위해 초깃값을 1로 설정.
    dosageDifferRadio: {
      yes: false,
      no: false
    }, firstTakingYear: '', firstTakingMonth: '', firstTakingDay: '',
    initialDosageCount: '', initialDosageMg: '', initialDosageFrequency: 1,
    stopTakingYear: '', stopTakingMonth: '', stopTakingDay: '',
    noEffect: false, expensive: false, personalResearch: false, doctorAdvice: false, sideEffect: false, courseDone: false, other: false, reasonText: '',
    frontError: ''
  }

  handleOptionChange = (e) => {
    let obj = {}, objInside = {};
    objInside[e.target.value] = e.target.checked  // true
    obj[e.target.name] = objInside;
    this.setState(obj);
  }

  handleDateChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    if (
      /** 년도는 월, 일의 입력 여부에 따른 제약 없이 입력 가능하다. */
      (e.target.name === 'recentTakingYear') || (e.target.name === 'firstTakingYear') || (e.target.name === 'stopTakingYear')
      /** 년도를 입력하기 전까지는 월을 입력할 수 없다. */
      || (e.target.name === ('recentTakingMonth') && this.state['recentTakingYear'])
      || (e.target.name === ('firstTakingMonth') && this.state['firstTakingYear'])
      || (e.target.name === ('stopTakingMonth') && this.state['stopTakingYear'])
      /** 월을 입력하기 전까지는 일자를 입력할 수 없다. */
      || (e.target.name === ('recentTakingDay') && this.state['recentTakingMonth'])
      || (e.target.name === ('firstTakingDay') && this.state['firstTakingMonth'])
      || (e.target.name === ('stopTakingDay') && this.state['stopTakingMonth'])
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
  }

  render() {
    const { state, handleOptionChange, handleDateChange, handleInputChange, handleCheckboxChange } = this;
    const {
      takingStatus, recentTakingYear, recentTakingMonth, recentTakingDay, dosageCount, dosageMg, dosageFrequency, additionalDosage, additionalDosageCount, switchRadio, switchTo, dosageDifferRadio, firstTakingYear, firstTakingMonth, firstTakingDay, initialDosageCount, initialDosageMg, initialDosageFrequency, stopTakingYear, stopTakingMonth, stopTakingDay, noEffect, expensive, personalResearch, doctorAdvice, sideEffect, courseDone, other, reasonText, frontError
    } = this.state;
    const { visible, medicineList, onCancel, onSubmit, error } = this.props;

    /** 존재하는 처방약 리스트를 조회하여 select의 option list를 생성한다. */
    const medicineOptionList = medicineList.map((medicine) => {
      const { fkMedicineId: id } = medicine.toJS();
      const { nameKr } = medicine.toJS().RegisteredMedicinePurposeData;
      return <option key={id} value={id}>{nameKr}</option>
    });

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>현재 해당 처방약을 복용 중이신가요?</div>
          <input type="radio" name="takingStatus" value="yes" checked={takingStatus.yes} onChange={handleOptionChange}/>예
          <input type="radio" name="takingStatus" value="no" checked={takingStatus.no} onChange={handleOptionChange}/>아니오

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
            { additionalDosage && '수량: '}  {/** html과 string을 더하면 string이 되어 html 변환을 해야 하므로 input html과 string을 분리한다. */}
            { additionalDosage && <input name="additionalDosageCount" autoFocus type="number" value={additionalDosageCount} onChange={handleInputChange}/>}
            { additionalDosage && '정(알)씩'}  {/** html과 string을 더하면 string이 되어 html 변환을 해야 하므로 input html과 string을 분리한다. */}

            <div className={cx('question')}>원래 다른 처방약을 복용하다가 해당 처방약으로 바꾸게 된 것인가요?</div> {/** Did you switch to Bupropion from another treatment(s)? */}
            <input name="switchRadio" type="radio" value="yes" checked={switchRadio.yes} onChange={handleOptionChange}/>예
            <input name="switchRadio" type="radio" value="no" checked={switchRadio.no} onChange={handleOptionChange}/>아니오
            { switchRadio.yes &&
              <div>
                <div className={cx('question')}>바꾸기 전 원래 복용하던 처방약이 무엇인가요?</div>
                <select name="switchTo" value={switchTo} onChange={handleInputChange}>{medicineOptionList}</select>
              </div>
            }

            <div className={cx('question')}>처방약을 복용하기 시작했을 때, (전에도 같은 처방약을 복용한 경험이 있다면) 전과는 다른 복용량을 섭취하게 되었나요?</div>
            <input name="dosageDifferRadio" type="radio" value="yes" checked={dosageDifferRadio.yes} onChange={handleOptionChange}/>예
            <input name="dosageDifferRadio" type="radio" value="no" checked={dosageDifferRadio.no} onChange={handleOptionChange}/>아니오

            { dosageDifferRadio.yes && <div>
              <div className={cx('question')}>최초로 해당 처방약을 복용하기 시작했던 것이 언제인가요?</div>
              {/* 날짜 input: 년, 월, 일 */}
              <input name="firstTakingYear" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={firstTakingYear} onChange={handleDateChange}/>
              <span>년   </span>
              <input name="firstTakingMonth" autoFocus type="number" min="1" max="12" step="1" value={firstTakingMonth} onChange={handleDateChange}/>
              <span>월 (알고 있다면 기입해주세요)   </span>
              <input name="firstTakingDay" autoFocus type="number" min="1" max="31" step="1" value={firstTakingDay} onChange={handleDateChange}/>
              <span>일 (알고 있다면 기입해주세요)</span>

              <div className={cx('question')}>최초의 복용량이 어떻게 되나요?</div>
              수량: <input name="initialDosageCount" autoFocus type="number" value={initialDosageCount} onChange={handleInputChange}/>정(알)씩
              용량: <input name="initialDosageMg" autoFocus type="number" value={initialDosageMg} onChange={handleInputChange}/>mg/1정(1알)
              빈도: <select name="initialDosageFrequency" value={initialDosageFrequency} onChange={handleInputChange}>
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
            </div>}

            { takingStatus.no && 
              <div> {/** 현재 해당 처방약을 복용하고 있지 않을 경우 */}
                <div className={cx('question')}>해당 처방약 복용을 그만두게 된 것이 언제인가요?</div>
                {/* 날짜 input: 년, 월, 일 */}
                <input name="stopTakingYear" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={stopTakingYear} onChange={handleDateChange}/>
                <span>년   </span>
                <input name="stopTakingMonth" autoFocus type="number" min="1" max="12" step="1" value={stopTakingMonth} onChange={handleDateChange}/>
                <span>월 (알고 있다면 기입해주세요)   </span>
                <input name="stopTakingDay" autoFocus type="number" min="1" max="31" step="1" value={stopTakingDay} onChange={handleDateChange}/>
                <span>일 (알고 있다면 기입해주세요)</span>

                <div className={cx('question')}>해당 처방약 복용을 그만두게 된 이유가 무엇인가요? (중복 선택 가능)</div>
                <input type="checkbox" key={1} name="noEffect" value="noEffect" checked={noEffect} onChange={handleInputChange}/>효과가 없는 것 같아서
                <input type="checkbox" key={2} name="expensive" value="expensive" checked={expensive} onChange={handleInputChange}/>가격이 비싸서
                <input type="checkbox" key={3} name="personalResearch" value="personalResearch" checked={personalResearch} onChange={handleInputChange}/>개인적인 판단 하에
                <input type="checkbox" key={4} name="doctorAdvice" value="doctorAdvice" checked={doctorAdvice} onChange={handleInputChange}/>전문가(의사, 임상심리전문가 등)의 권유로
                <input type="checkbox" key={5} name="sideEffect" value="sideEffect" checked={sideEffect} onChange={handleInputChange}/>부작용이 너무 심해서
                <input type="checkbox" key={6} name="courseDone" value="courseDone" checked={courseDone} onChange={handleInputChange}/>치료 과정이 모두 마무리 되어서
                <input type="checkbox" key={7} name="other" value="other" checked={other} onChange={handleInputChange}/>기타
                { other && 
                  <div>  {/** other를 선택했을 경우 */}
                    <div className={cx('question')}>해당 처방약 복용을 그만두게 된 또 다른 이유들을 적어주세요.</div>
                    <input name="reasonText" type="textarea" autoFocus value={reasonText} onChange={handleInputChange}/>
                  </div>
                }
              </div>
            }
          </div>}
          {/** front단 에러 */}
          { frontError && <div className={cx('error')}>{frontError}</div>}
          {/* 에러 처리 */}
          { error && <div className={cx('error')}>{error}</div>}
        </div>
        <div>
          <br/>
          <Button onClick={() => {
            if (
              ((!takingStatus.yes && !takingStatus.no) || !recentTakingYear)
              || (dosageDifferRadio.yes && !firstTakingYear)
              || (takingStatus.no && !stopTakingYear)
            ) this.setState({ frontError: '날짜를 입력하세요.' });
            else if (
              (!dosageCount || !dosageMg || !dosageFrequency)
              || (dosageDifferRadio.yes && (!initialDosageCount || !initialDosageMg || !initialDosageFrequency))
            ) this.setState({ frontError: '복용량을 입력하세요.' });
            else onSubmit({ state });
          }}>추가</Button>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileMedicineDosageAddModal;