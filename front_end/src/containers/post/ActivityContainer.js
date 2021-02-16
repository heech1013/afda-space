import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as profileActions from 'store/modules/profile';
import * as postActions from 'store/modules/post';

import Activity from 'components/post/Activity';

class ActivityContainer extends Component {
  getActivities = async () => {
    const {
      PostActions,
      type,  // 'newspeed' / 'profile'
      userId = null,  // type이 'profile'인 경우 전달 받음.
    } = this.props;
    // await PostActions.getActivities(type, userId);
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