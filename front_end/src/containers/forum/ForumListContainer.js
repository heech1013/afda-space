import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';
import * as baseActions from 'store/modules/base/base';

import ForumList from 'components/forum/ForumList';

class ForumListContainer extends Component {
  getForumList = () => {
    const { ForumActions, type } = this.props;
    if (type === 'center') {}
    else if (type === 'station') ForumActions.getStationList(type);  
  }

  handleModal = () => {
    const { logged, id, type, BaseActions } = this.props;

    if (!logged || !id) {  /** 로그인 여부 검정 */
      alert('로그인 후 이용해주세요.');
    } else {
      if (type === 'center') {}
      else if (type === 'station') {
        BaseActions.showModal('stationAdd');
      }
    }
  }

  componentDidMount() {
    this.getForumList();
  }

  render() {
    const { handleModal } = this;
    const {
      type,
      loading_GET_STATION_LIST, loading_GET_CENTER_LIST,
      stationList, centerList
    } = this.props;

    const buttonString = (type === 'center') ? '기관 추가하기' : (type === 'station') ? '주제 등록하기' : null;

    const forumList = (type === 'center') ? centerList : (type === 'station') ? stationList : null;

    if (loading_GET_CENTER_LIST || loading_GET_STATION_LIST) return null;
    return (
      <div>
        <ForumList
          onModal={handleModal}
          buttonString={buttonString}
          contents={forumList}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading_GET_STATION_LIST: state.pender.pending['forum/GET_STATION_LIST'],
    // loading_GET_CENTER_LIST: state.pender.pending['forum/GET_STATION_LIST'],
    stationList: state.forum.get('stationList'),
    // centerList: station.forum.get('centerList),
    logged: state.base.get('logged'),
    id: state.base.get('id')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(ForumListContainer);