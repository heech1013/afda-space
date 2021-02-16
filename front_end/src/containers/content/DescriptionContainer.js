import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content';

import Description from 'components/content/Description';

class DescriptionContainer extends Component {
  getContent = () => {
    const { ContentActions, type, id } = this.props;
    ContentActions.getContent(type, id);
  }

  componentDidMount() {
    this.getContent();
  }

  render() {
    const { loading, content } = this.props;
    const { nameKr, description } = content.toJS();
    if (loading) return null;
    return (
      <div>
        <Description
          nameKr={nameKr}
          content={description}/>
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
)(DescriptionContainer);