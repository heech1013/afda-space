import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as centerListActions from 'store/modules/centerList';

import ForumContentList from 'components/forum/ForumContentList';

class CenterListContainer extends Component {
  getCenterList = () => {
    const { CenterListActions } = this.props;
    CenterListActions.getCenterList();
  }

  componentDidMount() {
    this.getCenterList();
  }

  render() {
    const { loading, centerList } = this.props;
    if (loading) return null;
    return (
      <div>
        <ForumContentList
          contents={centerList}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['centerList/GET_CENTER_LIST'],
    centerList: state.centerList.get('centerList')
  }),
  (dispatch) => ({
    CenterListActions: bindActionCreators(centerListActions, dispatch)
  })
)(CenterListContainer);