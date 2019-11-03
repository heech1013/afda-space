import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import ProfileDiagnosisAddModal from 'components/modal/ProfileDiagnosisAddModal';

class ProfileDiagnosisAddModalContainer extends Component {
  render() {
    const { visible } = this.props;
    return (
      <ProfileDiagnosisAddModal
        visible={visible}/>
    )
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'profileDiagnosisAdd'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(ProfileDiagnosisAddModalContainer);