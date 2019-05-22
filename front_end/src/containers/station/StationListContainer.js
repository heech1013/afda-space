import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as stationListActions from 'store/modules/stationList';

import ForumContentList from 'components/forum/ForumContentList';

class StationListContainer extends Component {
  getStationList = () => {
    const { StationListActions } = this.props;
    StationListActions.getStationList();
  }

  componentDidMount() {
    this.getStationList();
  }

  render() {
    const { loading, stationList } = this.props;
    if (loading) return null;
    return (
      <div>
        <ForumContentList
          contents={stationList}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['stationList/GET_STATION_LIST'],
    stationList: state.stationList.get('stationList')
  }),
  (dispatch) => ({
    StationListActions: bindActionCreators(stationListActions, dispatch)
  })
)(StationListContainer);