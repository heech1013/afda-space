import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import supportImg from 'support.png';
import supportCheckedImg from 'support-checked.png';
import Writer from 'components/common/Writer';

const cx = classNames.bind(styles);

const CommentItem = ({nick, body}) => (
  <div className={cx('comment-item')}>
    <Link className={cx('nick')} to={`/profile/?nick=${nick}`}>{nick}</Link>
    <div className={cx('body')}>{body}</div>
  </div>
);

const PostItem = ({nick, updatedAt, body, support, checked, onClick, comment}) => {
  const CommentList = comment.map(
    (comment) => {
      const { id, nick, body } = comment;  // .toJS();
      return (
        <CommentItem
          key={id}
          nick={nick}
          body={body}
        />
      );
    }
  );

  return (
    <div className={cx('post-item')}>
      <Link className={cx('nick')} to={`/profile/?nick=${nick}`}>{nick}</Link>
      <div className={cx('date')}>{format(updatedAt, 'YYYY.MM.DD HH:mm')}</div>
      <p className={cx('body')}>{body}</p>
      { checked ?
          <img className={cx('img')} src={supportCheckedImg} height='22' width='22' onClick={() => onClick()} alt='support-checked'/>
          : <img className={cx('img')} src={supportImg} height='22' width='22' onClick={() => onClick()} alt='support'/>
      }
      <div className={cx('support')}>응원해요 <b>{support}</b>개</div>
      <br/><hr className={cx('hr')}/>
      <div className={cx('comment-list')}>
        {CommentList}
      </div>
    </div>
  )
};

const PostList = ({posts}) => {
  const postList = posts.map(
    (post) => {
      const { id, nick, updatedAt, body, support, checked, onClick, comment } = post;  // .toJS();
      return (
        <div className={cx('post-wrapper')} key={id}>
          <PostItem
            // key={id}
            nick={nick}
            updatedAt={updatedAt}
            body={body}
            support={support}
            checked={checked}
            onClick={onClick}
            comment={comment}
          />
          <Writer theme={'comment-writer'}/>
        </div >
      );
    }
  );

  return (
    <div className={cx('post-list')}>
      {postList}
    </div>
  );
};

export default PostList;