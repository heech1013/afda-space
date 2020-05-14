import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as profileActions from 'store/modules/profile/profile';
import * as postActions from 'store/modules/post/post';

import Activity from 'components/post/Activity';

class ActivityContainer extends Component {
  getActivities = async () => {
    const {
      PostActions,
      userId = null,  // 특정 유저 profile의 newspeed일 경우 전달 받음
    } = this.props;
    
    userId ?
      await PostActions.getActivities(userId)
      :
      await PostActions.getNewspeed();
  }

  componentDidMount() {
    this.getActivities();
  }
  
  render() {
    const {
      activities
    } = this.props;
    
    return (
      <Activity
        activities={activities}
      />
    )
  }
}

export default connect(
  (state) => ({
    activities: state.post.get('activities')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(ActivityContainer);