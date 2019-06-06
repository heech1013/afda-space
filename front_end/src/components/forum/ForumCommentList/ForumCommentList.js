import React from 'react';
import styles from './ForumCommentList.scss';
import classNames from 'classnames/bind';
import { Link, withRouter } from 'react-router-dom';
import format from 'date-fns/format';

const cx = classNames.bind(styles);

const Comment = ({nick, updatedAt, body}) => (
  <div className={cx('comment')}>
    <Link className={cx('nick')} to={`/profile/${nick}`}>{nick}</Link>
    <span className={cx('updatedAt')}>{updatedAt}</span>
    <div className={cx('body')}>{body}</div>
  </div>
)

const ForumCommentList = ({comments, location}) => {
  let row;
  if (location.pathname.split('/')[1] === 'center') {
    row = '후기'
  } else if (location.pathname.split('/')[1] === 'station') {
    row = '답변'
  }

  const commentList = comments.map((comment) => {
    const { updatedAt, body, RegisteringCenterComment = null, RegisteringStationComment = null } = comment.toJS();
    
    let id, nick;
    if (location.pathname.split('/')[1] === 'center') {  // center
      id = RegisteringCenterComment.id;
      nick = RegisteringCenterComment.Profile.nick;
    } else if (location.pathname.split('/')[1] === 'station') {  // station
      id = RegisteringStationComment.id;
      nick = RegisteringStationComment.Profile.nick;
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

export default withRouter(ForumCommentList);