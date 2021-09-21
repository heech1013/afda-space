import React, { useState } from 'react';
import styles from './JoinForm.scss';
import classNames from 'classnames/bind';

interface JoinFormProps {
  joinType: string;
  onJoin: (a: object) => void;
  error: any;
}

const cx = classNames.bind(styles);

function JoinForm({ joinType, onJoin, error }: JoinFormProps) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    nick: '',
    birthDate: '',
    sex: '',
    frontError: '',
  })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    })
  }

  const { email, password, nick, birthDate, sex, frontError } = inputs;
  const areInputsNotFilled = 
    (joinType === 'LOCAL' && (!email || !password)) 
    || (!nick || !birthDate || !sex)

  const handleButtonClick = () => {
    if (areInputsNotFilled) {
      setInputs({ 
        ...inputs,
        frontError: '항목을 모두 입력해주세요.'
      });
    } else {
      setInputs({ 
        ...inputs,
        frontError: ''
      });
      onJoin(inputs);
    };
  }

  return (
    <div className={cx('join-form')}>
      { joinType === 'KAKAO' ?
        <div className={cx('notice')}>성공적으로 카카오톡 계정과 연결되었습니다.<br/>다음 정보를 입력하여 계정 생성을 완료하세요.</div>
        :
        null
      }
      { joinType === 'LOCAL' ?
        <div>
          <div className={cx('join-form-title')}>이메일</div>
          <input className={cx('join-form-blank')} autoFocus type='text' name="email" value={email} onChange={handleInputChange}/>
          <div className={cx('join-form-title')}>비밀번호</div>
          <input className={cx('join-form-blank')} autoFocus type='password' name="password" value={password} onChange={handleInputChange}/>
        </div>
        :
        null
      }
      <div className={cx('join-form-title')}>닉네임</div>
      <input className={cx('join-form-blank')} autoFocus type='text' name="nick" value={nick} onChange={handleInputChange}/>
      <div className={cx('join-form-title')}>생년월일</div>
      <input className={cx('join-form-blank')} type="date" name="birthDate" value={birthDate} onChange={handleInputChange}/>
      <div className={cx('join-form-title')}>성별</div>
      <div className={cx('join-form-blank')}>
        <input type='radio' name="sex" value={1} checked={sex === '1'} onChange={handleInputChange}/>남자<br/>
        <input type='radio' name="sex" value={2} checked={sex === '2'} onChange={handleInputChange}/>여자
      </div>
      <br/>
      {/** front단 에러 */}
      { frontError && <div className={cx('error')}>{frontError}</div>}
      {/* server 에러 */}
      { error && <div className={cx('error')}>{error}</div>}
      <div className={cx('button')} onClick={handleButtonClick}>가입하기</div>
    </div>
  )
}

export default JoinForm;