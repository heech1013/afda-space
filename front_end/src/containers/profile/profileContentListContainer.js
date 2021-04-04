import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as profileActions from 'store/modules/profile';
import * as contentActions from 'store/modules/content';

import ProfileContentList from 'components/profile/ProfileContentList';

class ProfileContentListContainer extends Component {
  getContentList = async() => {
    const { type, ProfileActions, userId: id } = this.props;
    if (type === 'diagnosis') await ProfileActions.getUserDiagnosisList(id);
    else if (type === 'medicine') await ProfileActions.getUserMedicineList(id);
    else if (type === 'symptom') await ProfileActions.getUserSymptomList(id);
  }

  updateContentId = async (contentId) => {
    const { ProfileActions } = this.props;
    await ProfileActions.updateContentId(contentId);
  }

  handleDelete = async (contentId, subType = null) => {
    const { type, ContentActions } = this.props;
    switch (type) {
      case 'diagnosis':  // 진단명 - 삭제하기
        await ContentActions.deleteContent('diagnosisData', contentId);
        break;
      case 'symptom':  // 증상명 - 삭제하기
        await ContentActions.deleteContent('symptomData', contentId);
        break;
      case 'medicine':
          switch (subType) {
            case null:  // 처방약 - 삭제하기
              await ContentActions.deleteContent('medicineData', contentId);
              break;
            case 'dosage':  // 처방약 - 용량 삭제하기
              await ContentActions.deleteContent('medicineDosageData', contentId);
              break;
            case 'purpose':  // 처방약 - 처방목적 삭제하기
              await ContentActions.deleteContent('medicinePurposeData', contentId);
              break;
            case 'evaluation':  // 처방약 - 평가 삭제하기
              await ContentActions.deleteContent('medicineEvaluationData', contentId);
              break;
            default:
          }
        break;
      default:
        break;
    }
    this.getContentList();
  }

  handleModal = (type) => {
    const { BaseActions } = this.props;
    BaseActions.showModal(type);
  }

  componentDidMount() {
    const { logged } = this.props;
    if (logged) this.getContentList();
  }

  render() {
    const {
      userId, storeId,
      diagnosisList = null, medicineList = null, symptomList = null
    } = this.props;
    const { handleDelete, handleModal, updateContentId } = this;
    const updatable = String(userId) === String(storeId);
    return (
      <div>
        <ProfileContentList
          diagnosisList={diagnosisList}
          medicineList={medicineList}
          symptomList={symptomList}
          updatable={updatable}
          onDelete={handleDelete}
          onModal={handleModal}
          updateContentId={updateContentId}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    storeId: state.base.get('id'),
    diagnosisList: state.profile.get('diagnosisList'),
    medicineList: state.profile.get('medicineList'),
    symptomList: state.profile.get('symptomList')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ProfileContentListContainer);