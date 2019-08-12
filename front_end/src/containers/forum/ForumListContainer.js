import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';

import ForumList from 'components/forum/ForumList';

class ForumListContainer extends Component {
  getForumList = () => {
    const { ForumActions, type } = this.props;
    ForumActions.getForumList(type);
  }

  componentDidMount() {
    this.getForumList();
  }

  render() {
    const { loading, forumList } = this.props;
    if (loading) return null;
    return (
      <div>
        <ForumList
          contents={forumList}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['forum/GET_FORUM_LIST'],
    forumList: state.forum.get('forumList')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(ForumListContainer);