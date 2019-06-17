import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as profileActions from 'store/modules/profile/profile';

import ProfileCard from 'components/profile/ProfileCard';

class ProfileCardContainer extends Component {
  getProfile = () => {
    const { ProfileActions, id } = this.props;
    ProfileActions.getProfile(id);
  }
  
  componentDidMount() {
    const { logged } = this.props;
    if (logged) this.getProfile();
  }

  render() {
    const { logged, loading, profile } = this.props;
    if (!logged) return <div>로그인 후에 사용 가능합니다.</div>
    else if (loading) return null;
    return (
      <div>
        <ProfileCard
          profile={profile}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    loading: state.pender.pending['profile/GET_PROFILE'],
    profile: state.profile.get('profile')
  }),
  (dispatch) => ({
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(ProfileCardContainer);