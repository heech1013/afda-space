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
    recentTakingDay: ''
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

  render() {
    const { handleRadioChange, handleDateChange } = this;
    const { takingStatus, recentTakingYear, recentTakingMonth, recentTakingDay } = this.state;
    const { visible, onCancel, onSubmit, error } = this.props;


    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div className={cx('question')}>현재 해당 처방약을 복용 중이신가요?</div>
          <input type="radio" name="takingStatus" value="yes" checked={takingStatus['yes']} onChange={handleRadioChange}/>예
          <input type="radio" name="takingStatus" value="no" checked={takingStatus['no']} onChange={handleRadioChange}/>아니오

          { takingStatus.yes && <div className={cx('question')}>처방약을 복용하기 시작한 것이 언제인가요?</div>}
          { takingStatus.no && <div className={cx('question')}>가장 최근에 처방약을 복용하기 시작한 것이 언제인가요?</div>  /** When did you start your most recent dosage? */ }
          {/* 날짜 input: 년, 월, 일 */}
          <input name="recentTakingYear" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={recentTakingYear} onChange={handleDateChange}/>
          <span>년   </span>
          <input name="recentTakingMonth" autoFocus type="number" min="1" max="12" step="1" value={recentTakingMonth} onChange={handleDateChange}/>
          <span>월 (알고 있다면 기입해주세요)   </span>
          <input name="recentTakingDay" autoFocus type="number" min="1" max="31" step="1" value={recentTakingDay} onChange={handleDateChange}/>
          <span>일 (알고 있다면 기입해주세요)</span>

          <div className={cx('question')}>현재 복용량이 어떻게 되나요?</div>
          <div className={cx('question')}>가장 최근 복용량이 어떻게 되나요?</div>
          {/** dosage input */}

          {/** additional dosage checkbox & input */}

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