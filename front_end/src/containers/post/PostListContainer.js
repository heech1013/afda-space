import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postListActions from 'store/modules/postList';

import PostList from 'components/post/PostList';

class PostListContainer extends Component {
  getPostList = () => {
    const { PostListActions } = this.props;
    PostListActions.getPostList();
  }

  componentDidMount() {
    this.getPostList();
  }
  
  render () {
    const { loading, posts } = this.props;
    if (loading) return null;
    return (
      <div>
        <PostList posts={posts}/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['postList/GET_POST_LIST'],
    posts: state.postList.get('posts')
  }),
  (dispatch) => ({
    PostListActions: bindActionCreators(postListActions, dispatch)
  })
)(PostListContainer);