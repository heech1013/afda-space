import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum';
import * as postActions from 'store/modules/post';

import Writer from 'components/common/Writer';

class WriterContainer extends Component {
  /** type === 'station'
   * 댓글 작성 이후 댓글 리스트 재로딩 */
  getStationCommentList = async () => {
    const { ForumActions, id } = this.props;
    await ForumActions.getStationCommentList(id);
  }

  /** type === 'newspeed' or 'post-comment'
   * 포스트 작성 이후 뉴스피드 재로딩 */
  initializeNewspeed = async () => {
    return new Promise( async (resolve, reject) => {
      const { PostActions } = this.props;
      await PostActions.initializeNewspeed();
      resolve();
    })
    
  }
  
  getNewspeed = () => {
    const {
      PostActions,
      /** 
       * 특정 유저 profile의 newspeed일 경우 전달 받음, 메인 페이지 newspeed일 경우 'undefined'(string)
       * newspeedPage -> newspeedContainer -> newspeed -> WriterContainer
       * WriterContainer in newspeedPage 의 경우 newspeedPage로부터 바로 주입
       */
      filteringUserId
    } = this.props;

    /** getNewspeed()
     * @param filteringUserId : 'undefined'를 넘겨줄 경우 where 조건문 없이 퀴리문을 작성.
     */
    // PostActions.getNewspeed(filteringUserId, lastPostId, lastActivityId);
    PostActions.getNewspeed(filteringUserId, null, null);
  }

  handleSubmit = async({ state }) => {
    const {
      type,
      ForumActions, loggedUserId, id: stationId,
      PostActions,
      postId  // type = 'post-comment', postPostComment()
    } = this.props;

    state.userId = loggedUserId;

    if (type === 'station') {
      state.stationId = stationId;
      await ForumActions.postStationComment(state);
      this.getStationCommentList();
    }

    else if (type === 'newspeed') {
      await PostActions.postPost(state);
      this.initializeNewspeed()
        .then(() => {
          this.getNewspeed();
        });
    }

    else if (type === 'post-comment') {
      await PostActions.postPostComment(postId, state);
      this.initializeNewspeed()
        .then(() => {
          this.getNewspeed();
        });
    }
  }

  render() {
    const { handleSubmit } = this;
    /** type: 'station', 'newspeed'
     */
    const { type, loggedUserId, logged } = this.props;
    const isLogged = (loggedUserId && logged);  // true or false
    
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
    loggedUserId: state.base.get('id'),
    logged: state.base.get('logged'),

    loading_GET_NEWSPEED: state.pender.pending['post/GET_NEWSPEED'],
    newspeed: state.post.get('newspeed'),
    isLast: state.post.get('isLast'),
    lastPostId: state.post.get('lastPostId'),
    lastActivityId: state.post.get('lastActivityId')
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch),
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(WriterContainer);