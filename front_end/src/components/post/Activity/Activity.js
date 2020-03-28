import React from 'react';
import styles from './Activity.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

const ActivityItem = ({

})

const Activity = ({activities}) => {
  const activityList = activities.map((activity, index) => {
    const { type, target, userId, nick, createdAt } = activity.toJS();
    return (
      <div>
        <ActivityItem
          type={type}
          target={target}
          userId={userId}
          nick={nick}
          createdAt={createdAt}
        />
      </div>
    )
  });

  return (
    <div className={cx('activity')}>
      <div className={cx('activity-title')}>{}</div>
      {activityList}
    </div>
  )
};

export default Activity;