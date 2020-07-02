import React from 'react';
import styles from './Newspeed.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import LoadingView from 'components/common/LoadingView';
import WriterContainer from 'containers/common/WriterContainer';

const cx = classNames.bind(styles);

const PostCommentItem = ({body, createdAt, userId, nick}) => (
  <div className={cx('post-comment-item')}>
    <Link className={cx('post-comment-item-link')} to={`/profile/${userId}`}>{nick}</Link>
    <div className={cx('post-comment-item-date')}>{createdAt}</div>
    <div className={cx('post-comment-item-body')}>{body}</div>
  </div>
)

const PostItem = ({ postId, userId, nick, createdAt, body, postComments, filteringUserId }) => {
  const postCommentList = postComments.map((obj, index) => {
    const { body, user } = obj;
    return (
      <PostCommentItem
        key={index}
        body={body}
        createdAt={createdAt}
        userId={user.id}
        nick={user.profile.nick}
      />
    )
  })

  return (
    <div className={cx('post-wrapper')}>
      <div className={cx('post-item')}>
        <Link className={cx('post-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
        <div className={cx('post-item-date')}>{createdAt}</div>
        <p className={cx('post-item-body')}>
          {body}
        </p>
        { (postCommentList.length) ? <hr/> : null } {/** 댓글이 존재하는 경우에만 글과 댓글 사이에 줄 치기 */}
        <div className={cx('post-comment-list')}>
          {postCommentList}
        </div>
      </div>
      <WriterContainer
        type={'post-comment'}
        postId={postId}
        filteringUserId={filteringUserId}
      />
    </div>
  )
}

const ActivityItem = ({ userId, nick, createdAt, logType, target, targetId }) => {
  let itemDetail = null;
  if (logType === 'USER_JOIN') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
      </div>님이 새로 가입했습니다.
    </div>
  }
  else if (logType === 'REGISTER_DIAGNOSIS') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
      </div>님이 프로필에 
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/diagnosis/${targetId}/summary`}>
          {target}
        </Link>
      </div>을(를) 새로 추가했습니다.
    </div>
  }
  else if (logType === 'REGISTER_MEDICINE') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
      </div>님이 프로필에 
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>
          {target}
        </Link>
      </div>을(를) 새로 추가했습니다.
    </div>
  }
  else if (logType === 'REGISTER_MEDICINE_DOSAGE') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
      </div>님이 프로필에 
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>
          {target}
        </Link>
      </div>에 대한 용량 정보를 새로 추가했습니다.
    </div>
  }
  else if (logType === 'REGISTER_MEDICINE_PURPOSE') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
      </div>님이 프로필에 
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>
          {target}
        </Link>
      </div>에 대한 처방목적을 새로 추가했습니다.
    </div>
  }
  else if (logType === 'REGISTER_MEDICINE_EVALUATION') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
      </div>님이 프로필에 
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>
          {target}
        </Link>
      </div>에 대한 평가를 새로 추가했습니다.
    </div>
  }
  else if (logType === 'REGISTER_SYMPTOM') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}>
        <Link className={cx('activity-item-link')} to={`/profile/${userId}`}>
          {nick}
        </Link>
      </div>님이 프로필에 
      <div className={cx('activity-item-link-wrapper')}>
        {target}
      </div>을(를) 새로 추가했습니다.
    </div>
  }

  return (
    <div className={cx('activity-item')}>
      {itemDetail}
      <div className={cx('activity-item-date')}>{createdAt}</div>
    </div>
  )
}

const Newspeed = ({ newspeed, isLoading, isLast, filteringUserId }) => {
  const newspeedList = newspeed.map((obj, index) => {
    const { 
      /** common */
      peedType, userId, nick, createdAt,
      /** type == POST */
      postId, body, postComments,
      /** type == ACTIVITY_LOG */
      logType, target, targetId
    } = obj.toJS();

    return (
      peedType === "POST" ?
        <div key={index}>
          <PostItem
            postId={postId}
            userId={userId}
            nick={nick}
            createdAt={createdAt}
            body={body}
            postComments={postComments}
            filteringUserId={filteringUserId}
          />
        </div>
        : peedType === "ACTIVITY_LOG" ?
          <div key={index}>
            <ActivityItem
              userId={userId}
              nick={nick}
              createdAt={createdAt}
              logType={logType}
              target={target}
              targetId={targetId}
            />
          </div> : null
    )
  });

  return (
    <div className={cx('newspeed')}>
      {newspeedList}
      { isLast && <div className={cx('newspeed-is-last')}>더 이상 게시물이 존재하지 않습니다.</div> }
      <LoadingView
        isLoading={isLoading}
      />
    </div>
  )
};

export default Newspeed;