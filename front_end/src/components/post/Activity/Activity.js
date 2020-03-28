import React from 'react';
import styles from './Activity.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ActivityItem = ({
  type, target, targetId, userId, nick, createdAt
}) => {
  let itemDetail = null;
  if (type === 'USER_JOIN') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/profile/${userId}`}>{nick}</Link></div>님이 새로 가입했습니다.
    </div>
  }
  else if (type === 'REGISTER_DIAGNOSIS') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/profile/${userId}`}>{nick}</Link></div>님이 프로필에 <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/diagnosis/${targetId}/summary`}>{target}</Link></div>을(를) 새로 추가했습니다.
    </div>
  }
  else if (type === 'REGISTER_MEDICINE') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/profile/${userId}`}>{nick}</Link></div>님이 프로필에 <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>{target}</Link></div>을(를) 새로 추가했습니다.
    </div>
  }
  else if (type === 'REGISTER_MEDICINE_DOSAGE') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/profile/${userId}`}>{nick}</Link></div>님이 프로필에 <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>{target}</Link></div>에 대한 용량 정보를 새로 추가했습니다.
    </div>
  }
  else if (type === 'REGISTER_MEDICINE_PURPOSE') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/profile/${userId}`}>{nick}</Link></div>님이 프로필에 <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>{target}</Link></div>에 대한 처방목적을 새로 추가했습니다.
    </div>
  }
  else if (type === 'REGISTER_MEDICINE_EVALUATION') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/profile/${userId}`}>{nick}</Link></div>님이 프로필에 <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/medicine/${targetId}/summary`}>{target}</Link></div>에 대한 평가를 새로 추가했습니다.
    </div>
  }
  else if (type === 'REGISTER_SYMPTOM') {
    itemDetail = <div className={cx('activity-item-detail')}>
      <div className={cx('activity-item-link-wrapper')}><Link className={cx('activity-item-link')} to={`/profile/${userId}`}>{nick}</Link></div>님이 프로필에 <div className={cx('activity-item-link-wrapper')}>{target}</div>을(를) 새로 추가했습니다.
    </div>
  }

  return (
    <div className={cx('activity-item')}>
      {itemDetail}
      <div className={cx('activity-item-date')}>{createdAt}</div>
    </div>
  )
}

const Activity = ({title, activities}) => {
  const activityList = activities.map((activity, index) => {
    const { type, target, targetId, userId, nick, createdAt } = activity.toJS();
    return (
      <div key={index}>
        <ActivityItem
          type={type}
          target={target}
          targetId={targetId}
          userId={userId}
          nick={nick}
          createdAt={createdAt}
        />
      </div>
    )
  });

  return (
    <div className={cx('activity')}>
      <div className={cx('activity-title')}>{'최근 활동 둘러보기'}</div>
      {activityList}
    </div>
  )
};

export default Activity;