import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as contentActions from 'store/modules/content/content';
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
  // handleSubmit = ({}) => {

  // }

  componentDidMount() {
    this.getDiagnosisList();
  }

  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible, diagnosisList } = this.props;
    return (
      <ProfileDiagnosisAddModal
        visible={visible}
        onCancle={handleCancel}
        onSubmit={handleSubmit}
        diagnosisList={diagnosisList}/>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileDiagnosisAdd']),
    diagnosisList: state.content.get('contentList')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch),
  })
)(ProfileDiagnosisAddModalContainer);