import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content/content';
import * as baseActions from 'store/modules/base/base';
import * as profileActions from 'store/modules/profile/profile';
import ProfileMedicinePurposeAddModal from 'components/modal/ProfileMedicinePurposeAddModal';

class ProfileMedicinePurposeAddModalContainer extends Component {
  /** modal의 증상 option을 위한 정보 받아오기 */
  handleRequest = async (type) => {  // type: diagnosis / symptom
    const { ContentActions } = this.props;
    await ContentActions.getContentList(type);
  }

  /** 증상 정보 추가 성공 후 추가한 정보를 포함하여 보여주기 위해 새로 사용자의 증상 정보를 받아온다.
   * modal과 별개
   */
  getUserSymptomList = () => {
    const { userId: id, ProfileActions } = this.props;
    ProfileActions.getUserContentList('symptom', id);
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileSymptomAdd');
  }

  handleSubmit = async (symptomId) => {
    const { userId: id, ProfileActions, BaseActions } = this.props;
    try {
      await ProfileActions.postUserSymptom(id, symptomId);
      BaseActions.hideModal('profileSymptomAdd');
      this.getUserSymptomList();
    } catch (e) {}
  }

  componentDidMount() {
    // this.getSymptomOptionList();
  }

  render() {
    const { handleCancel, handleRequest, handleSubmit } = this;
    const { visible, purposeList } = this.props;
    return (
      <ProfileMedicinePurposeAddModal
        visible={visible}
        purposeList={purposeList}
        onCancel={handleCancel}
        onRequest={handleRequest}
        onSubmit={handleSubmit}
      />
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileMedicinePurposeAdd']),
    purposeList: state.content.get('contentList')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileMedicinePurposeAddModalContainer);