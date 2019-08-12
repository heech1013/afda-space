import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';

import ForumTitle from 'components/forum/ForumTitle';

class ForumTitleContainer extends Component {
  getForum = () => {
    const { ForumActions, type, id } = this.props;
    ForumActions.getForum(type, id);
  }

  componentDidMount() {
    this.getForum();
  }

  render() {
    const { loading, forum } = this.props;

    if (loading) return null;
    return (
      <div>
        <ForumTitle
          forum={forum}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['forum/GET_FORUM'],
    forum: state.forum.get('forum')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(ForumTitleContainer);