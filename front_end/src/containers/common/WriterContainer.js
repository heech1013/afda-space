import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';

import Writer from 'components/common/Writer';

class WriterContainer extends Component {
  /** 댓글 작성 이후 댓글 리스트 재 로딩 */
  getStationCommentList = () => {
    const { ForumActions, id } = this.props;
    ForumActions.getStationCommentList(id);
  }

  handleSubmit = async({ state }) => {
    const { ForumActions, userId, id: stationId } = this.props;
    state.userId = userId;
    state.stationId = stationId;
    await ForumActions.postStationComment(state);
    this.getStationCommentList();
  }

  render() {
    const { handleSubmit } = this;
    const { userId, logged } = this.props;
    const isLogged = (userId && logged);  // true or false
    
    return (
      <div>
        <Writer
          onSubmit={handleSubmit}
          logged={isLogged}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    userId: state.base.get('id'),
    logged: state.base.get('logged')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(WriterContainer);