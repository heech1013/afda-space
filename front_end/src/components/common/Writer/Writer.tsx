import React, { useState } from 'react';
import styles from './Writer.scss';
import classNames from 'classnames/bind';
import Button from 'components/common/Button';

interface WriterProps {
  type: string
  logged: boolean
  onSubmit: any
}

const cx = classNames.bind(styles);

function Writer({ type, logged, onSubmit }: WriterProps) {
  const [body, setBody] = useState('')
  const [frontError, setFrontError] = useState<string | null>(null)

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setBody(e.target.value)
  }

  const handleButtonClick = () => {
    if (!logged) {
      setFrontError('로그인이 필요합니다.');
    }
    else if (!body.length) {
      setFrontError('내용을 입력해주세요.');
    }
    else {
      onSubmit(body);
      setBody('');
      setFrontError(null);
    }
  }

  const placeholder = (type === 'post-comment') ? '댓글 달기..' : undefined;
  
  let buttonText = ''
  if (type === 'station') {
    buttonText = '답변 작성하기'
  } else if (type === 'newspeed') {
    buttonText = '글 작성하기'
  } else if (type === 'post-comment') {
    buttonText = '작성'
  }

  return (
    <div className={cx('writer', type)}>
      <textarea 
        className={cx('writer-input')} 
        name={'body'} 
        placeholder={placeholder} 
        value={body} 
        onChange={handleInputChange}
      />
      
      {/** front단 에러 */}
      {frontError && <div className={cx('error')}>{frontError}</div>}

      <div className={cx('writer-button')}>
        <Button onClick={handleButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  )
}

export default Writer;