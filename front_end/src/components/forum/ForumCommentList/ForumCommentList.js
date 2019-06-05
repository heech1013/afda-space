import React from 'react';
import styles from './ForumCommentList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const cx = classNames.bind(styles);

const Comment = ({nick, updatedAt, body}) => (
  <div className={cx('comment')}>
    <Link className={cx('nick')} to={`/profile/${nick}`}>{nick}</Link>
    <span className={cx('updatedAt')}>{updatedAt}</span>
    <div className={cx('body')}>{body}</div>
  </div>
)

const ForumCommentList = ({row, comments}) => {
  const commentList = comments.map((comment) => {
    const { updatedAt, body, RegisteringCenterComment = null, RegisteringStationComment = null } = comment.toJS();
    
    let id, nick;
    if (row === '답변') {  // station
      id = RegisteringStationComment.id;
      nick = RegisteringStationComment.Profile.nick;
    } else if (row === '후기') {  // center
      id = RegisteringCenterComment.id;
      nick = RegisteringCenterComment.Profile.nick;
    }

    return (
      <div>
        <Comment
          key={id}
          nick={nick}
          updatedAt={format(updatedAt, 'YYYY.MM.DD HH:mm')}
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