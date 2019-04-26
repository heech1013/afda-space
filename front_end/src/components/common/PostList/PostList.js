import React from 'react';
import styles from './PostList.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import format from 'date-fns/format';

const cx = classNames.bind(styles);

const PostItem = ({nick, updatedAt, body}) => (
  <div className={cx('post-item')}>
    <Link className={cx('nick')} to={`/profile/?nick=${nick}`}>{nick}</Link>
    <div className={cx('date')}>{format(updatedAt, 'YYYY.MM.DD HH:mm')}</div>
    <p className={cx('body')}>{body}</p>
  </div>
);

const PostList = ({posts}) => {
  const postList = posts.map(
    (post) => {
      const { nick, updatedAt, body } = post;  // .toJS();
      return (
        <PostItem
          nick={nick}
          updatedAt={updatedAt}
          body={body}
        />
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