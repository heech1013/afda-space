import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content/content';

import ContentTitle from 'components/content/ContentTitle';

class ContentTitleContainer extends Component {
  getContent = () => {
    const { ContentActions, type, id } = this.props;
    ContentActions.getContent(type, id);
  }

  componentDidMount() {
    this.getContent();
  }

  render() {
    const { loading, content } = this.props;
    const { nameKr, nameEn } = content.toJS();
    if (loading) return null;
    return (
      <div>
        <ContentTitle
          nameKr={nameKr}
          nameEn={nameEn}
          buttonString={'내 프로필에 추가'}
          onClick={() => console.log('add content to my profile')}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['content/GET_CONTENT'],
    content: state.content.get('content')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ContentTitleContainer);