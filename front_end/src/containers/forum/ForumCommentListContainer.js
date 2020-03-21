import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';

import ForumCommentList from 'components/forum/ForumCommentList';

class ForumCommentListContainer extends Component {
  getForumCommentList = () => {
    const { ForumActions, type, id } = this.props;
    if (type === 'center') {}
    else if (type === 'station') ForumActions.getStationCommentList(id);
  }

  componentDidMount() {
    this.getForumCommentList();
  }

  render() {
    const {
      type,
      loading_GET_CENTER_COMMENT_LIST, loading_GET_STATION_COMMENT_LIST,
      stationCommentList, centerCommentList
    } = this.props;

    const forumCommentList = (type === 'center') ? centerCommentList : (type === 'station') ? stationCommentList : null;

    if (loading_GET_CENTER_COMMENT_LIST || loading_GET_STATION_COMMENT_LIST) return null;
    return (
      <div>
        <ForumCommentList
          type={type}
          comments={forumCommentList}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading_GET_CENTER_COMMENT_LIST: state.pender.pending['forum/GET_CENTER_COMMENT_LIST'],
    loading_GET_STATION_COMMENT_LIST: state.pender.pending['forum/GET_STATION_COMMENT_LIST'],
    centerCommentList: state.forum.get('centerCommentList'),
    stationCommentList: state.forum.get('stationCommentList')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(ForumCommentListContainer);