import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as profileActions from 'store/modules/profile/profile';
import * as contentActions from 'store/modules/content/content';

import ProfileContentList from 'components/profile/ProfileContentList';

class ProfileContentListContainer extends Component {
  getContentList = () => {
    const { type, ProfileActions, userId: id } = this.props;
    if (type === 'diagnosis' || type === 'medicine' || type === 'symptom') ProfileActions.getUserContentList(type, id);
  }

  handleDelete = async (diagnosisDataId) => {
    const { ContentActions } = this.props;
    try {
      await ContentActions.deleteContent('diagnosisData', diagnosisDataId);
    } catch (e) {}
    this.getContentList();
  }

  componentDidMount() {
    const { logged } = this.props;
    if (logged) this.getContentList();
  }

  render() {
    const { userId, storeId, loading, contents } = this.props;
    const { handleDelete } = this;
    if (loading) return null;
    // eslint-disable-next-line eqeqeq
    const updatable = userId == storeId;
    return (
      <div>
        <ProfileContentList
          contents={contents}
          updatable={updatable}
          onClick={handleDelete}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    storeId: state.base.get('id'),
    loading: state.pender.pending['profile/GET_USER_DIAGNOSIS_LIST'],
    contents: state.profile.get('contents')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ProfileContentListContainer);