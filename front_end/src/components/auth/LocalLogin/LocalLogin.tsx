import React, { useState } from 'react';
import styles from './LocalLogin.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

interface LocalLoginProps {
  onLogin: (email: string, password: string) => void;
  error: any
}

const cx = classNames.bind(styles);

function LocalLogin({ onLogin, error }: LocalLoginProps) {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
    frontError: ''
  })

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }

  const handleButtonClick = () => {
    if (!email || !password) {
      setInputs({
        ...inputs,
        frontError: '항목을 모두 입력해주세요.',
      });
    } else {
      setInputs({
        ...inputs,
        frontError: '',
      });
      onLogin(email, password);
    }
  }

  const { email, password, frontError } = inputs;
  
  return (
    <div className={cx('local-login')}>
      <div className={cx('local-login-or')}>또는</div>
      <div className={cx('local-login-form-wrapper')}>
        <div>이메일</div>
        <input className={cx('local-login-form', 'email')} name={"email"} value={email} autoFocus onChange={handleInputChange}/>
        <div>비밀번호</div>
        <input className={cx('local-login-form')} name={"password"} value={password} type={"password"} autoFocus onChange={handleInputChange}/>
        <div  className={cx('local-login-button-wrapper')}>
          <Button onClick={handleButtonClick}>로그인</Button>
          {/** front error : 이메일 or 비밀번호 미기입 */}
          { frontError && <div className={cx('local-login-error')}>{frontError}</div>}
          {/** server error : 이메일 or 비밀번호 불일치 */}
          { error && <div className={cx('local-login-error')}>{error}</div>}
        </div>
        <div className={cx('local-login-link-wrapper')}><a className={cx('local-login-link')} href="/join">이메일로 계정 만들기</a></div>
      </div>
    </div>
  )
}

export default LocalLogin;