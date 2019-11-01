import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as contentActions from 'store/modules/content/content';

import ContentTitle from 'components/content/ContentTitle';

class ContentTitleContainer extends Component {
  getContent = () => {
    const { ContentActions, type, id } = this.props;
    ContentActions.getContent(type, id);
  }

  handleModal = () => {
    const { BaseActions } = this.props;
    BaseActions.showModal('profileDiagnosisAdd');
  }

  componentDidMount() {
    this.getContent();
  }

  render() {
    const { loading, content, buttonString } = this.props;
    const { handleModal } = this;
    const { nameKr, nameEn } = content.toJS();
    if (loading) return null;
    return (
      <div>
        <ContentTitle
          nameKr={nameKr}
          nameEn={nameEn}
          buttonString={buttonString}
          onClick={handleModal}/>
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
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ContentTitleContainer);