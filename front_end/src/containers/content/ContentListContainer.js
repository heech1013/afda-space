import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content/content';

import ContentList from 'components/content/ContentList';

class ContentListContainer extends Component {
  getContentList = () => {
    const { ContentActions, id, type, subType } = this.props;
    if (subType === null) ContentActions.getContentList(type);
    else if (subType === 'symptom') ContentActions.getContentSymptomList(type, id);
  }

  componentDidMount() {
    this.getContentList();
  }

  render() {
    const { type, subType, loading, contentList, contentSymptomList } = this.props;

    const rowObj = {
      "diagnosis": "진단명",
      "medicine": "처방약",
      "symptom": "증상명"
    }
    const row_1 = subType ? rowObj[subType] : rowObj[type];
    
    const contentsObj = {
      "symptom": contentSymptomList
    };
    const contents = subType ? contentsObj[subType] : contentList;

    const to = subType ? null : type;

    if (loading) return null;
    return (
      <div>
        <ContentList
          row_1={row_1}
          // row_2={'사람 수'}
          to={to}
          contents={contents}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['content/GET_CONTENT_LIST'],
    contentList: state.content.get('contentList'),
    contentSymptomList: state.content.get('contentSymptomList')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ContentListContainer);