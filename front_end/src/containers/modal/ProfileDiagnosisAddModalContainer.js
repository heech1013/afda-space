import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as contentActions from 'store/modules/content/content';
import * as profileActions from 'store/modules/profile/profile';
import ProfileDiagnosisAddModal from 'components/modal/ProfileDiagnosisAddModal';

class ProfileDiagnosisAddModalContainer extends Component {
  getDiagnosisList = () => {
    const { ContentActions } = this.props;
    ContentActions.getContentList('diagnosis');
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileDiagnosisAdd');
  }

  handleSubmit = async ({state: data}) => {
    const { userId: id, ProfileActions, BaseActions } = this.props;  // userId: ProfileDiagnosisPage.js에서 전달 받음.
    try {
      await ProfileActions.postUserDiagnosis(id, data);
      BaseActions.hideModal('profileDiagnosisAdd');
      this.getDiagnosisList();
    } catch (e) {}
  }

  componentDidMount() {
    this.getDiagnosisList();
  }

  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible, diagnosisList, error } = this.props;
    return (
      <ProfileDiagnosisAddModal
        visible={visible}
        onCancle={handleCancel}
        onSubmit={handleSubmit}
        diagnosisList={diagnosisList}
        error={error}/>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileDiagnosisAdd']),
    diagnosisList: state.content.get('contentList'),
    error: state.profile.getIn(['error', 'userDiagnosisCreate'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileDiagnosisAddModalContainer);