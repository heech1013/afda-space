import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as profileActions from 'store/modules/profile';
import ProfileUpdateModal from 'components/modal/ProfileUpdateModal';

class ProfileUpdateModalContainer extends Component {
  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileCard');
  }

  handleSubmit = async (nick, introduction) => {
    const { ProfileActions } = this.props;
    try {
      await ProfileActions
    } catch (e) { }
  }
  
  render() {
    const { visible, error } = this.props;
    const { handleCancel, handleSubmit } = this;
    return (
      <ProfileUpdateModal
        visible={visible}
        error={error}
        onCancel={}
        onSubmit={}/>
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