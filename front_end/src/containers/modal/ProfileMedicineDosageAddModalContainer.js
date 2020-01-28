import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as contentActions from 'store/modules/content/content';
import * as profileActions from 'store/modules/profile/profile';
import ProfileMedicineDosageAddModal from 'components/modal/ProfileMedicineDosageAddModal';

class ProfileMedicineDosageAddModalContainer extends Component {
  /** modal의 증상 option을 위한 정보 받아오기 */
  getMedicineOptionList = () => {
    const { ContentActions } = this.props;
    ContentActions.getContentList('medicine');
  }

  /** 처방약 추가 성공 후 추가한 정보를 포함하여 보여주기 위해 새로 사용자의 처방약 리스트를 받아온다.
   * modal과 별개
   */
  getUserMedicineList = () => {
    const { userId, ProfileActions } = this.props;
    ProfileActions.getUserContentList('medicine', userId);
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileMedicineDosageAdd');
  }

  handleSubmit = async ({ state: data }) => {
    const { userId: id, contentId, ProfileActions, BaseActions } = this.props;
    try {
      /** 제출 직전 ProfileMedicineDosageAddModal로부터 넘어온 state의 contentId 값을 업데이트.
       * contentId 전달 경로: ProfileContentListContainer의 contents의 contentId 
        -> ProfileContentList의 <Content>의 <Button>의 onClick에서 contentId를 store(profile)에 업데이트
        -> ProfileMedicineDosageAddModalContainer에서 contentId를 store로부터 props로 전달받아 제출(onSubmit) 직전에 data(Modal로부터의 state)를 업데이트
      */
      data.contentId = contentId;
      await ProfileActions.postUserMedicineDosage(id, data);
      BaseActions.hideModal('profileMedicineDosageAdd');
      this.getUserMedicineList();
    } catch (e) {}
  }

  componentDidMount() {
    this.getMedicineOptionList();
  }

  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible, medicineList, contentId, error } = this.props;

    return (
      <ProfileMedicineDosageAddModal 
        visible={visible}
        medicineList={medicineList}
        contentId={contentId}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        error={error}
      />
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileMedicineDosageAdd']),
    medicineList: state.content.get('contentList'),
    contentId: state.profile.get('contentId'),  // medicineId
    error: state.profile.getIn(['error', 'userMedicineCreate'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileMedicineDosageAddModalContainer);