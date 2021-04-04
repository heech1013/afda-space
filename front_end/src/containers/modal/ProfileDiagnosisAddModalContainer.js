import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as contentActions from 'store/modules/content';
import * as profileActions from 'store/modules/profile';
import ProfileDiagnosisAddModal from 'components/modal/ProfileDiagnosisAddModal';

class ProfileDiagnosisAddModalContainer extends Component {
  /** modal의 진단명 option을 위한 정보 받아오기 */
  getDiagnosisOptionList = () => {
    const { ContentActions } = this.props;
    ContentActions.getDiagnosisList();
  }

  /** 진단명 정보 추가 성공 후 추가한 정보를 포함하여 보여주기 위해 새로 사용자의 진단명 정보를 받아온다.
   * modal과 별개
   */
  getUserDiagnosisList = () => {
    const { userId, ProfileActions } = this.props;
    ProfileActions.getUserDiagnosisList(userId);
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileDiagnosisAdd');
  }

  handleSubmit = async ({state: data}) => {
    const { userId: id, ProfileActions, BaseActions } = this.props;  // userId: ProfileDiagnosisPage.js에서 전달 받음.
    await ProfileActions.postUserDiagnosis(id, data);
    BaseActions.hideModal('profileDiagnosisAdd');
    this.getUserDiagnosisList();
  }

  componentDidMount() {
    this.getDiagnosisOptionList();
  }

  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible, diagnosisList, error } = this.props;
    return (
      <ProfileDiagnosisAddModal
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        diagnosisList={diagnosisList}
        error={error}/>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileDiagnosisAdd']),
    diagnosisList: state.content.get('diagnosisList'),
    error: state.profile.getIn(['error', 'userDiagnosisCreate'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileDiagnosisAddModalContainer);