import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as forumActions from 'store/modules/forum';
import StationAddModal from 'components/modal/StationAddModal';

class StationAddModalContainer extends Component {
  getStationList = () => {
    const { ForumActions } = this.props;
    ForumActions.getStationList();
  }

  handleCancel = () => {
    const { BaseActions } = this.props;
    BaseActions.hideModal('stationAdd');
  }

  handleSubmit = async ({ state: data }) => {
    const { BaseActions, ForumActions, logged, id } = this.props;
    if (!logged || !id) alert('다시 로그인 후 등록해주세요.');
    else {
      data.userId = id;
      await ForumActions.postStation(data);
      BaseActions.hideModal('stationAdd');
      this.getStationList();
    }
  }
  
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
    visible: state.base.getIn(['modal', 'stationAdd']),
    logged: state.base.get('logged'),
    id: state.base.get('id')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ForumActions: bindActionCreators(forumActions, dispatch),
  })
)(StationAddModalContainer);