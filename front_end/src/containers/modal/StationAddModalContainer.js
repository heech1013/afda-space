import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as forumActions from 'store/modules/forum/forum';
import StationAddModal from 'components/modal/StationAddModal';

class StationAddModalContainer extends Component {
  render() {
    const { handleCancel, handleSubmit } = this;
    const { visible } = this.props;
    return (
      <StationAddModal
        visible={visible}
        onCancel={handleCancel}
        onSubmit={handleSubmit}
      />
    );
  }
}

export default connect(
  (state) => ({
    visible: state.base.getIn(['modal', 'stationAdd'])
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ForumActions: bindActionCreators(forumActions, dispatch),
  })
)(StationAddModalContainer);