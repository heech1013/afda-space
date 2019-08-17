import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as profileActions from 'store/modules/profile/profile';

import ProfileContentList from 'components/profile/ProfileContentList';

class ProfileContentListContainer extends Component {
  

  render() {
    const { userId, storeId, loading, content } = this.props;
    if (loading) return null;
    // eslint-disable-next-line eqeqeq
    const updatable = userId == storeId;
    return (
      <div>
        <ProfileContentList
          content={content}
          updatable={updatable}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    storeId: state.base.get('id'),
    loading: state.pender.pending[]
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileContentListContainer);