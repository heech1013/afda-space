import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content';
import * as baseActions from 'store/modules/base';
import * as profileActions from 'store/modules/profile';
import ProfileSymptomAddModal from 'components/modal/ProfileSymptomAddModal';

class ProfileSymptomAddModalContainer extends Component {
  /** modal의 증상 option을 위한 정보 받아오기 */
  getSymptomOptionList = () => {
    const { ContentActions } = this.props;
    ContentActions.getSymptomList();
  }

  /** 증상 정보 추가 성공 후 추가한 정보를 포함하여 보여주기 위해 새로 사용자의 증상 정보를 받아온다.
   * modal과 별개
   */
  getUserSymptomList = () => {
    const { userId: id, ProfileActions } = this.props;
    ProfileActions.getUserSymptomList(id);
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileSymptomAdd');
  }

  handleSubmit = async (symptomId) => {
    const { userId: id, ProfileActions, BaseActions } = this.props;
    await ProfileActions.postUserSymptom(id, symptomId);
    BaseActions.hideModal('profileSymptomAdd');
    this.getUserSymptomList();
  }

  componentDidMount() {
    this.getSymptomOptionList();
  }

  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible, symptomList, error } = this.props;
    return (
      <ProfileSymptomAddModal
        visible={visible}
        symptomList={symptomList}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        error={error}
      />
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileSymptomAdd']),
    symptomList: state.content.get('symptomList'),
    error: state.profile.getIn(['error', 'userSymptomCreate'])
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileSymptomAddModalContainer);