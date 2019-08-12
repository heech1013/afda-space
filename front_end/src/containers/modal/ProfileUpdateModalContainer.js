import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as profileActions from 'store/modules/profile/profile';
import ProfileUpdateModal from 'components/modal/ProfileUpdateModal';

class ProfileUpdateModalContainer extends Component {
  getProfile = () => {
    const { ProfileActions, userId: id } = this.props;
    ProfileActions.getProfile(id);
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileCardUpdate');
  }

  handleSubmit = async ({nick, introduction}) => {
    const { userId: id } = this.props;
    const { ProfileActions, BaseActions } = this.props;
    try {
      await ProfileActions.updateProfileCard(id, nick, introduction);
      BaseActions.hideModal('profileCardUpdate');
      this.getProfile();
    } catch (e) {}
  }
  
  render() {
    const { visible, error } = this.props;
    const { handleCancel, handleSubmit } = this;
    return (
      <ProfileUpdateModal
        visible={visible}
        error={error}
        onCancel={handleCancel}
        onSubmit={handleSubmit}/>
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileCardUpdate']),
    error: state.profile.getIn(['profileCardUpdate', 'error'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileUpdateModalContainer);