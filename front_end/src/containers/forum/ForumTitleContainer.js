import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as forumActions from 'store/modules/forum';

import ForumTitle from 'components/forum/ForumTitle';

class ForumTitleContainer extends Component {
  getForum = () => {
    const { ForumActions, type, id } = this.props;
    if (type === 'center') {}
    else if (type === 'station') ForumActions.getStation(id);
  }

  componentDidMount() {
    this.getForum();
  }

  render() {
    const {
      type,
      loading_GET_STATION, loading_GET_CENTER,
      station, center
    } = this.props;
    const forum = (type === 'center') ? center : (type === 'station') ? station: null;

    if (loading_GET_STATION || loading_GET_CENTER) return null;
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
    loading_GET_STATION: state.pender.pending['forum/GET_STATION'],
    loading_GET_CENTER: state.pender.pending['forum/GET_CENTER'],
    station: state.forum.get('station'),
    center: state.forum.get('center')
  }),
  (dispatch) => ({
    ForumActions: bindActionCreators(forumActions, dispatch)
  })
)(ForumTitleContainer);