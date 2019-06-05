import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';

import ForumCommentList from 'components/forum/ForumCommentList';

class ForumCommentListContainer extends Component {
  getForumCommentList = () => {
    const { ForumActions, type, id } = this.props;
    ForumActions.getForumCommentList(type, id);
  }

  componentDidMount() {
    this.getForumCommentList();
  }

  render() {
    const { loading, forumCommentList } = this.props;
    if (loading) return null;
    return (
      <div>
        <ForumCommentList
          comments={forumCommentList}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['forum/GET_FORUM_COMMENT_LIST'],
    forumCommentList: state.forum.get('forumCommentList')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(ForumCommentListContainer);