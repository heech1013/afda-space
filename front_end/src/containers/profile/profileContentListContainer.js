import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as profileActions from 'store/modules/profile/profile';

import profileContentList from 'components/profile/profileContentList';

class profileContentListContainer extends Component {
  

  render() {
  
    return (
      <div>
        <profileContentList
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch)
  })
)(profileContentListContainer);