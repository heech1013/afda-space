import React, { Component } from 'react';
import styles from './ProfileMedicineEvaluationAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileMedicineEvaluationAddModal extends Component {
  state = {
    contentId: '',
    evaluationDate: '',
    perceivedEffectiveness: {
      canNotTell: false,
      none: false,
      slight: false,
      moderate: false,
      major: false
    },
    sideEffects: {
      none: false,
      mild: false,
      moderate: false,
      severe: false
    },
    symptomId: 1,
    startNoticingWhenStartTaking: {
      yes: false,
      no: false
    },
    startNoticingYear: '',
    startNoticingMonth: '',
    startNoticingDay: '',
    adherence: {
      never: false,
      sometimes: false,
      usually: false,
      always: false
    },
    burden: {
      notAtAll: false,
      aLittle: false,
      somewhat: false,
      very: false
    },
    unexpectedPositiveEffects: {
      yes: false,
      no: false
    },
    tips: '',
    costDateUnit: 1,
    cost: '',
    frontError: ''
  }

  handleOptionChange = (e) => {
    let obj = {}, objInside = {};
    objInside[e.target.value] = e.target.checked  // true
    obj[e.target.name] = objInside;
    this.setState(obj);
  }

  handleInputChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    this.setState(obj);
  }

  handleDateChange = (e) => {
    let obj = {};
    obj[e.target.name] = e.target.value;
    if (
      /** 년도는 월, 일의 입력 여부에 따른 제약 없이 입력 가능하다. */
      (e.target.name === 'startNoticingYear')
      /** 년도를 입력하기 전까지는 월을 입력할 수 없다. */
      || (e.target.name === ('startNoticingMonth') && this.state['startNoticingYear'])
      /** 월을 입력하기 전까지는 일자를 입력할 수 없다. */
      || (e.target.name === ('startNoticingDay') && this.state['startNoticingMonth'])
    ) this.setState(obj);
  }

  render() {
    const { state, handleOptionChange, handleInputChange, handleDateChange } = this;
    const {
      evaluationDate, perceivedEffectiveness, sideEffects, symptomId, startNoticingWhenStartTaking, startNoticingYear, startNoticingMonth, startNoticingDay, adherence, burden, unexpectedPositiveEffects, tips, costDateUnit, cost, frontError
    } = this.state;
    const { visible, symptomList, onCancel, onSubmit, error } = this.props;

    /** 존재하는 증상 리스트를 조회하여 select의 option list를 생성한다. */
    const symptomOptionList = symptomList.map((symptom) => {
      const { id, nameKr } = symptom.toJS();
      return <option key={id} value={id}>{nameKr}</option>
    });

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          
          <div className={cx('question')}>평가 날짜</div>
          <div>정확한 평가 날짜를 모르겠다면 가장 근접한 날짜를 추정해서 입력해주세요.</div>
          <input type="date" name="evaluationDate" value={evaluationDate} onChange={handleInputChange}/>
          
          <div className={cx('question')}>스스로 느끼기에, 현재 해당 처방약의 효과가 어떤가요?</div>
          <input type="radio" name="perceivedEffectiveness" value="canNotTell" checked={perceivedEffectiveness.canNotTell} onChange={handleOptionChange}/>모르겠다
          <input type="radio" name="perceivedEffectiveness" value="none" checked={perceivedEffectiveness.none} onChange={handleOptionChange}/>없다
          <input type="radio" name="perceivedEffectiveness" value="slight" checked={perceivedEffectiveness.slight} onChange={handleOptionChange}/>약간 있다
          <input type="radio" name="perceivedEffectiveness" value="moderate" checked={perceivedEffectiveness.moderate} onChange={handleOptionChange}/>보통
          <input type="radio" name="perceivedEffectiveness" value="major" checked={perceivedEffectiveness.major} onChange={handleOptionChange}/>크다
          
          <div className={cx('question')}>현재 해당 처방약의 부작용 정도가 전반적으로 어떤가요?</div>
          <input type="radio" name="sideEffects" value="none" checked={sideEffects.none} onChange={handleOptionChange}/>없다
          <input type="radio" name="sideEffects" value="mild" checked={sideEffects.mild} onChange={handleOptionChange}/>약간 있다
          <input type="radio" name="sideEffects" value="moderate" checked={sideEffects.moderate} onChange={handleOptionChange}/>보통
          <input type="radio" name="sideEffects" value="severe" checked={sideEffects.severe} onChange={handleOptionChange}/>심각하다

          { (sideEffects.mild || sideEffects.moderate || sideEffects.severe) && <div>
            <div className={cx('question')}>경험한 부작용 증상을 대표적으로 하나만 선택해주세요.</div>
            <select name="symptomId" value={symptomId} onChange={handleInputChange}>{symptomOptionList}</select>
            
            <div className={cx('question')}>처방약에 대한 부작용으로서 해당 증상을 언제부터 알아차리기 시작했나요?</div>
            <input type="radio" name="startNoticingWhenStartTaking" value="yes" checked={startNoticingWhenStartTaking.yes} onChange={handleOptionChange}/>처방약을 먹기 시작한 직후부터
            <input type="radio" name="startNoticingWhenStartTaking" value="no" checked={startNoticingWhenStartTaking.no} onChange={handleOptionChange}/>다른 날짜부터

            { startNoticingWhenStartTaking.no && <div>
              {/* 날짜 input: 년, 월, 일 */}
              <input name="startNoticingYear" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={startNoticingYear} onChange={handleDateChange}/>
              <span>년   </span>
              <input name="startNoticingMonth" autoFocus type="number" min="1" max="12" step="1" value={startNoticingMonth} onChange={handleDateChange}/>
              <span>월 (알고 있다면 기입해주세요)   </span>
              <input name="startNoticingDay" autoFocus type="number" min="1" max="31" step="1" value={startNoticingDay} onChange={handleDateChange}/>
              <span>일 (알고 있다면 기입해주세요)</span>
            </div> }
          </div> }

          <div className={cx('question')}>현재 얼마나 자주 처방된 대로 약을 복용하나요?</div>
          <input type="radio" name="adherence" value="never" checked={adherence.never} onChange={handleOptionChange}/>전혀 따르지 않는다
          <input type="radio" name="adherence" value="sometimes" checked={adherence.sometimes} onChange={handleOptionChange}/>가끔 따른다
          <input type="radio" name="adherence" value="usually" checked={adherence.usually} onChange={handleOptionChange}/>대부분 따른다
          <input type="radio" name="adherence" value="always" checked={adherence.always} onChange={handleOptionChange}/>항상 따른다

          <div className={cx('question')}>스스로 느끼기에 해당 처방약을 복용하는 것이 얼마나 어렵나요?</div>
          <input type="radio" name="burden" value="notAtAll" checked={burden.notAtAll} onChange={handleOptionChange}/>전혀 힘들지 않다
          <input type="radio" name="burden" value="aLittle" checked={burden.aLittle} onChange={handleOptionChange}/>약간 힘들다
          <input type="radio" name="burden" value="somewhat" checked={burden.somewhat} onChange={handleOptionChange}/>어느 정도 힘들다
          <input type="radio" name="burden" value="very" checked={burden.very} onChange={handleOptionChange}/>매우 힘들다

          <div className={cx('question')}>본래의 처방 목적 말고도, 해당 처방약을 복용하면서 예상치 못하게 긍정적인 효과를 경험한 적이 있나요?</div>
          <input type="radio" name="unexpectedPositiveEffects" value="yes" checked={unexpectedPositiveEffects.yes} onChange={handleOptionChange}/>네
          <input type="radio" name="unexpectedPositiveEffects" value="no" checked={unexpectedPositiveEffects.no} onChange={handleOptionChange}/>아니오

          <div className={cx('question')}>현재 해당 처방약을 고려하고 있거나 복용 중인 사람들과 공유하고 싶은 조언이나 팁이 있나요?</div>
          <textarea className={cx('tips')} name="tips" type="text" value={tips} onChange={handleInputChange} autoFocus />

          <div className={cx('question')}>현재 해당 처방약으로 인해 대략 어느 정도의 비용이 드나요?</div>  {/** optional in PLM */}
          <select name="costDateUnit" value={costDateUnit} onChange={handleInputChange}>
            <option key={1} value={1}>매월</option>
            <option key={2} value={2}>매주</option>
          </select>
          <input name="cost" type="number" valeue={cost} onChange={handleInputChange} min="0" step="1"/>원

          {/** front단 에러 */}
          { frontError && <div className={cx('error')}>{frontError}</div>}
          {/* 에러 처리 */}
          { error && <div className={cx('error')}>{error}</div>}
        </div>
        <div>
          <br/>
          <Button onClick={() => {
            if (
              !evaluationDate
              || (!perceivedEffectiveness.canNotTell && !perceivedEffectiveness.none && !perceivedEffectiveness.slight && !perceivedEffectiveness.moderate && !perceivedEffectiveness.major)
              || (!sideEffects.none && !sideEffects.mild && !sideEffects.moderate && !sideEffects.severe)
              || ((sideEffects.mild || sideEffects.moderate || sideEffects.severe) && ((!startNoticingWhenStartTaking.yes && !startNoticingWhenStartTaking.no) || (!startNoticingYear)))
              || (!adherence.never && !adherence.sometimes && !adherence.usually && !adherence.always)
              || (!burden.notAtAll && !burden.aLittle && !burden.somewhat && !burden.very)
              || (!unexpectedPositiveEffects.yes && !unexpectedPositiveEffects.no)
            ) this.setState({ frontError: '평가 항목을 모두 입력해주세요.' });
            else {
              onSubmit({ state });
              // this.setState({
              //   contentId: '', evaluationDate: '', perceivedEffectiveness: { canNotTell: false, none: false, slight: false, moderate: false, major: false },
              //   sideEffects: { none: false, mild: false, moderate: false, severe: false }, symptomId: 1, startNoticingWhenStartTaking: { yes: false, no: false },
              //   startNoticingYear: '', startNoticingMonth: '', startNoticingDay: '', adherence: { never: false, sometimes: false, usually: false, always: false },
              //   burden: { notAtAll: false, aLittle: false, somewhat: false, very: false }, unexpectedPositiveEffects: { yes: false, no: false }, tips: '',
              //   costDateUnit: '', cost: '', frontError: ''
              // });
            }
            /** 제출 후 form 빈칸으로 초기화 */
          }}>추가</Button>
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileMedicineEvaluationAddModal;