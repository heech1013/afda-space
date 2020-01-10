import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as contentActions from 'store/modules/content/content';
import ProfileMedicineAddModal from 'components/modal/ProfileMedicineAddModal';

class ProfileMedicineAddModalContainer extends Component {
  /** modal의 증상 option을 위한 정보 받아오기 */
  getMedicineOptionList = () => {
    const { ContentActions } = this.props;
    ContentActions.getContentList('medicine');
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('profileMedicineAdd');
  }

  componentDidMount() {
    this.getMedicineOptionList();
  }

  render() {
    const { handleCancel } = this;
    const { visible, medicineList } = this.props;

    return (
      <ProfileMedicineAddModal 
        visible={visible}
        medicineList={medicineList}
        onCancel={handleCancel}
      />
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileMedicineAdd']),
    medicineList: state.content.get('contentList')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ProfileMedicineAddModalContainer);