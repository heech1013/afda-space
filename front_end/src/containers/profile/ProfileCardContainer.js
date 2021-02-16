import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as profileActions from 'store/modules/profile';

import ProfileCard from 'components/profile/ProfileCard';

class ProfileCardContainer extends Component {
  getProfile = () => {
    const { ProfileActions, userId: id } = this.props;
    ProfileActions.getProfile(id);
  }
  
  componentDidMount() {
    this.getProfile();
  }

  handleEdit = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('profileCardUpdate');
  }

  render() {
    const { userId, storeId, logged, loading, profile } = this.props;
    const { handleEdit } = this;
    
    if (loading) return null;
    
    const updatable =
      (parseInt(userId) === parseInt(storeId))  // 접근한 주소의 param id와 리덕스 상 id가 일치하고
      && logged;  // 리덕스 상으로 logged 되어 있을 때

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