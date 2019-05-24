import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content/content';

import ContentList from 'components/content/ContentList';

class ContentListContainer extends Component {
  getContentList = () => {
    const { ContentActions, type } = this.props;
    ContentActions.getContentList(type);
  }

  componentDidMount() {
    this.getContentList();
  }

  render() {
    const { loading, type, contentList } = this.props;
    const rowObj = {
      "diagnosis": "진단명",
      "medicine": "처방약"
    }

    if (loading) return null;
    return (
      <div>
        <ContentList
          row_1={rowObj[type]}
          // row_2={'사람 수'}
          to={type}
          contents={contentList}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['content/GET_CONTENT_LIST'],
    contentList: state.content.get('contentList')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ContentListContainer);