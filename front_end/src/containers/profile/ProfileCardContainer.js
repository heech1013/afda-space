import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as profileActions from 'store/modules/profile/profile';

import ProfileCard from 'components/profile/ProfileCard';

class ProfileCardContainer extends Component {
  getProfile = () => {
    const { ProfileActions, userId: id } = this.props;
    ProfileActions.getProfile(id);
  }
  
  componentDidMount() {
    const { logged } = this.props;
    if (logged) this.getProfile();
  }

  handleEdit = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('profileCardUpdate');
  }

  render() {
    const { userId, storeId, loading, profile } = this.props;
    const { handleEdit } = this;
    if (loading) return null;
    // eslint-disable-next-line eqeqeq
    const updatable = userId == storeId;
    return (
      <div>
        <ProfileCard
          profile={profile}
          updatable={updatable}
          onEdit={handleEdit}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    storeId: state.base.get('id'),
    loading: state.pender.pending['profile/GET_PROFILE'],
    profile: state.profile.get('profile')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileCardContainer);