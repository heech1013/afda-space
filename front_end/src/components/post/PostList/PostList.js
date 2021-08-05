import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import Writer from 'components/common/Writer';
// import Badge from 'components/common/Badge';

const cx = classNames.bind(styles);

const CommentItem = ({nick, body}) => (
  <div className={cx('comment-item')}>
    <Link className={cx('nick')} to={`/profile/?nick=${nick}`}>{nick}</Link>
    <div className={cx('body')}>{body}</div>
  </div>
);

const PostItem = ({nick, updatedAt, body, comment}) => {
  const CommentList = comment.map(
    (comment) => {
      const { id, body, RegisteringPostComments } = comment;
      const nick = RegisteringPostComments.Profile.nick;
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
      <div className={cx('date')}>{format(updatedAt, 'YYYY.MM.DD')}</div>
      <p className={cx('body')}>{body}</p>
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
      const { id, body, updatedAt, Posts, RegisteredPostComments } = post.toJS();
      const nick = Posts.Profile.nick;
      return (
        <div className={cx('post-wrapper')} key={id}>
          <PostItem
            nick={nick}
            updatedAt={updatedAt}
            body={body}
            comment={RegisteredPostComments}
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