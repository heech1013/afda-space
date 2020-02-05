import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as contentActions from 'store/modules/content/content';
import * as profileActions from 'store/modules/profile/profile';
import ProfileMedicineAddModal from 'components/modal/ProfileMedicineAddModal';

class ProfileMedicineAddModalContainer extends Component {
  /** modal의 증상 option을 위한 정보 받아오기 */
  getMedicineOptionList = () => {
    const { ContentActions } = this.props;
    ContentActions.getMedicineList();
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
    BaseActions.hideModal('profileMedicineAdd');
  }

  handleSubmit = async ({ medicineId }) => {
    const { userId: id, ProfileActions, BaseActions } = this.props;
    try {
      await ProfileActions.postUserMedicine(id, medicineId);
      BaseActions.hideModal('profileMedicineAdd');
      this.getUserMedicineList();
    } catch (e) {}
  }

  componentDidMount() {
    this.getMedicineOptionList();
  }

  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible, medicineList, error } = this.props;

    return (
      <ProfileMedicineAddModal 
        visible={visible}
        medicineList={medicineList}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
        error={error}
      />
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileMedicineAdd']),
    medicineList: state.content.get('medicineList'),
    error: state.profile.getIn(['error', 'userMedicineCreate'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileMedicineAddModalContainer);