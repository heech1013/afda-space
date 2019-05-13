import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

import Writer from 'components/post/Writer';
import Badge from 'components/common/Badge';

const cx = classNames.bind(styles);

const CommentItem = ({nick, body}) => (
  <div className={cx('comment-item')}>
    <Link className={cx('nick')} to={`/profile/?nick=${nick}`}>{nick}</Link>
    <div className={cx('body')}>{body}</div>
  </div>
);

const PostItem = ({nick, updatedAt, body, theme, checked, number, onClick, comment}) => {
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
      <Badge theme={theme} checked={checked} number={number} onClick={onClick}/>
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
      const { id, nick, updatedAt, body, theme, checked, number, onClick, comment } = post;  // .toJS();
      return (
        <div className={cx('post-wrapper')} key={id}>
          <PostItem
            // key={id}
            nick={nick}
            updatedAt={updatedAt}
            body={body}
            theme={theme}
            checked={checked}
            number={number}
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