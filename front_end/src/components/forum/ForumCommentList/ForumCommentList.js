import React from 'react';
import styles from './ForumCommentList.scss';
import classNames from 'classnames/bind';
// import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const cx = classNames.bind(styles);

const Comment = ({nick, createdAt, body}) => (
  <div className={cx('comment')}>
    {/* <Link className={cx('nick')} to={`/profile/${nick}`}>{nick}</Link> */}
    <span className={cx('nick')} to={`/profile/${nick}`}>{nick}</span>
    <span className={cx('createdAt')}>{createdAt}</span>
    <div className={cx('body')}>{body}</div>
  </div>
)

const ForumCommentList = ({type, comments}) => {
  const row = (type === 'center') ? '후기' : (type === 'station') ? '답변' : null;
  
  const commentList = comments.map((comment) => {
    const { id, createdAt, body, user } = comment.toJS();
    const { id: userId, profile } = user;
    const { nick } = profile;

    return (
      <div>
        <Comment
          key={id}
          userId={userId}
          nick={nick}
          createdAt={format(createdAt, 'YYYY.MM.DD')}
          body={body}
        />
        <hr className={cx('hr')}/>
      </div>
    );
  });
  
  return (
    <div className={cx('forum-comment-list')}>
      <div className={cx('row')}>{row}</div>
      <hr className={cx('hr')}/>
      {commentList}
    </div>
  )
};

export default ForumCommentList;