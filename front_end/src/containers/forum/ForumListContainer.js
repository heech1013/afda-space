import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum/forum';
import * as baseActions from 'store/modules/base/base';

import ForumList from 'components/forum/ForumList';

class ForumListContainer extends Component {
  getForumList = () => {
    const { ForumActions, type } = this.props;
    ForumActions.getForumList(type);
  }

  handleModal = () => {
    const { type, BaseActions } = this.props;
    if (type === 'center') {}
    else if (type === 'station') {
      BaseActions.showModal('stationAdd');
    }
  }

  componentDidMount() {
    this.getForumList();
  }

  render() {
    const { handleModal } = this;
    const { type, loading, forumList } = this.props;

    const buttonString = (type === 'center') ? '기관 추가하기' : (type === 'station') ? '주제 등록하기' : null;

    if (loading) return null;
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
    loading: state.pender.pending['forum/GET_FORUM_LIST'],
    forumList: state.forum.get('forumList')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch),
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(ForumListContainer);