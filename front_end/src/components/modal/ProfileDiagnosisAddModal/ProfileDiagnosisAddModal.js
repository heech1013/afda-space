import React, { Component } from 'react';
import styles from './ProfileDiagnosisAddModal.scss';
import classNames from 'classnames/bind';
import ModalWrapper from 'components/modal/ModalWrapper';
import Button from 'components/common/Button';

const cx = classNames.bind(styles);

class ProfileDiagnosisAddModal extends Component {
  state = {
    firstNotice: '',
    firstNoticeYear: '',
    firstNoticeMonth: '',
    firstNoticeDay: '',
    firstDiagnosed: '',
    firstDiagnosedYear: '',
    firstDiagnosedMonth: '',
    firstDiagnosedDay: ''
  }

  handleFNChange = (e) => {
    this.setState({
      firstNotice: e.target.value,
      firstNoticeYear: '',
      firstNoticeMonth: '',
      firstNoticeDay: '',
    });
  }
  handleFNYChange = (e) => {
    this.setState({
      firstNotice: 'firstNoticeDate',
      firstNoticeYear: e.target.value
    });
  }
  handleFNMChange = (e) => {
    const { firstNoticeYear } = this.state;
    if (firstNoticeYear) this.setState({ firstNoticeMonth: e.target.value });
  }
  handleFNDChange = (e) => {
    const { firstNoticeMonth } = this.state;
    if (firstNoticeMonth) this.setState({ firstNoticeDay: e.target.value });
  }
  handleFDChange = (e) => {
    this.setState({
      firstDiagnosed: e.target.value,
      firstDiagnosedYear: '',
      firstDiagnosedMonth: '',
      firstDiagnosedDay: '',
    });
  }
  handleFDYChange = (e) => {
    this.setState({
      firstDiagnosed: 'firstDiagnosedDate',
      firstDiagnosedYear: e.target.value
    });
  }
  handleFDMChange = (e) => {
    const { firstDiagnosedYear } = this.state;
    if (firstDiagnosedYear) this.setState({ firstDiagnosedMonth: e.target.value });
  }
  handleFDDChange = (e) => {
    const { firstDiagnosedMonth } = this.state;
    if (firstDiagnosedMonth) this.setState({ firstDiagnosedDay: e.target.value });
  }
  
  render() {
    const { firstNoticeYear, firstNoticeMonth, firstNoticeDay, firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay } = this.state;
    const { visible, diagnosisList, onCancel, onSubmit } = this.props;  // onCancle 전달해줘야 함
    const { handleFNChange, handleFNYChange, handleFNMChange, handleFNDChange, handleFDChange, handleFDYChange, handleFDMChange, handleFDDChange } = this;

    const diagnosisOptionList = diagnosisList.map((diagnosis) => {
      const { fkDiagnosisId: id } = diagnosis.toJS();
      const { nameKr } = diagnosis.toJS().RegisteredDiagnosisData;
      return (
        <option key={id} value={id}>{nameKr}</option>
      )
    });

    return (
      <ModalWrapper visible={visible}>
        <div className={cx('form')}>
          <div className={cx('close')} onClick={() => onCancel()}>&times;</div>
          <div>추가하려는 진단명을 선택해주세요.</div>
          <select name="diagnosis">{diagnosisOptionList}</select>

          <div>처음으로 해당 진단명과 관련된 증상을 알아차린 것이 언제인가요?</div>
          {/* <input type="radio" name="firstNotice" value="firstNoticeDate" onChange={handleFNChange}/>어느 정도 정확한 날짜를 알고 있습니다. */}

          {/* 다른 radio 버튼 선택 시 빈칸 처리 */}
          <input name="firstNoticeYear" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={firstNoticeYear} onChange={handleFNYChange}/>
          <span>년</span>
          <input name="firstNoticeMonth" autoFocus type="number" min="1" max="12" step="1" value={firstNoticeMonth} onChange={handleFNMChange}/>
          <span>월 (알고 있다면 기입해주세요)</span>
          <input name="firstNoticeDay" autoFocus type="number" min="1" max="31" step="1" value={firstNoticeDay} onChange={handleFNDChange}/>
          <span>일 (알고 있다면 기입해주세요)</span>
          
          <input type="radio" name="firstNotice" value="firstNoticeUnaware" onChange={handleFNChange}/>증상을 전혀 알아채지 못했습니다.
          <input type="radio" name="firstNotice" value="firstNoticeUnknown" onChange={handleFNChange}/>잘 모르겠습니다.

          <div>전문가(전문의, 임상심리전문가 등)로부터 해당 진단명을 진단 받은 것이 언제인가요?</div>
          {/* <input type="radio" name="firstDiagnosed" value="firstDiagnosedrDate" onChange={handleFDChange}/>어느 정도 정확한 날짜를 알고 있습니다. */}
          
          {/* 다른 radio 버튼 선택 시 빈칸 처리 */}
          <input name="firstDiagnosedYear" autoFocus type="number" min="1900" max={new Date().getFullYear()} step="1" value={firstDiagnosedYear} onChange={handleFDYChange}/>
          <span>년</span>
          <input name="firstDiagnosedMonth" autoFocus type="number" min="1" max="12" step="1" value={firstDiagnosedMonth} onChange={handleFDMChange}/>
          <span>월 (알고 있다면 기입해주세요)</span>
          <input name="firstDiagnosedDay" autoFocus type="number" min="1" max="31" step="1" value={firstDiagnosedDay} onChange={handleFDDChange}/>
          <span>일 (알고 있다면 기입해주세요)</span>
          
          <input type="radio" name="firstDiagnosed" value="firstDiagnosedUnaware" onChange={handleFDChange}/>진단을 받은 적은 없지만, 제 생각엔 해당 증상명을 가지고 있는 것 같습니다.
          <input type="radio" name="firstDiagnosed" value="firstDiagnosedUnknown" onChange={handleFDChange}/>잘 모르겠습니다.
          {/* 에러 처리 */}
          <div>
            <Button onClick={() => onSubmit({
              firstNoticeYear, firstNoticeMonth, firstNoticeDay, firstDiagnosedYear, firstDiagnosedMonth, firstDiagnosedDay
            })}>저장</Button>
          </div>
          
        </div>
      </ModalWrapper>
    )
  }
}

export default ProfileDiagnosisAddModal;