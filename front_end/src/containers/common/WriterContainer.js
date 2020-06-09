import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';
import * as postActions from 'store/modules/post/post';

import Writer from 'components/common/Writer';

class WriterContainer extends Component {
  /** type === 'station'
   * 댓글 작성 이후 댓글 리스트 재로딩 */
  getStationCommentList = async () => {
    const { ForumActions, id } = this.props;
    await ForumActions.getStationCommentList(id);
  }

  /** type === 'newspeed'
   * 포스트 작성 이후 뉴스피드 재로딩 */
  getNewspeed = async () => {
    const { PostActions } = this.props;
    await PostActions.getNewspeed();
  }

  handleSubmit = async({ state }) => {
    const {
      type,
      ForumActions, userId, id: stationId,
      PostActions,
      postId  // postPostComment()
    } = this.props;

    state.userId = userId;

    if (type === 'station') {
      state.stationId = stationId;
      await ForumActions.postStationComment(state);
      this.getStationCommentList();
    }

    else if (type === 'newspeed') {
      await PostActions.postPost(state);
      this.getNewspeed();
    }

    else if (type === 'post-comment') {
      await PostActions.postPostComment(postId, state);
      this.getNewspeed();
    }
  }

  render() {
    const { handleSubmit } = this;
    /** type: 'station', 'newspeed'
     */
    const { type, userId, logged } = this.props;
    const isLogged = (userId && logged);  // true or false
    
    return (
      <div>
        <Writer
          type={type}
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
    PostActions: bindActionCreators(postActions, dispatch),
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(WriterContainer);