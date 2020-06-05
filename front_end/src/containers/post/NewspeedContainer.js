import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import * as baseActions from 'store/modules/base/base';
// import * as profileActions from 'store/modules/profile/profile';
import * as postActions from 'store/modules/post/post';

import Newspeed from 'components/post/Newspeed';

class NewspeedContainer extends Component {
  
  getNewspeed = async () => {
    const {
      PostActions,
      userId,  // 특정 유저 profile의 newspeed일 경우 전달 받음, 메인 페이지 newspeed일 경우 'undefined'(string)
    } = this.props;
    
    /** getNewspeed()
     * @param userId : 'undefined'를 넘겨줄 경우 where 조건문 없이 퀴리문을 작성.
     */
    await PostActions.getNewspeed(userId);
  }

  componentDidMount() {
    this.getNewspeed();
  }
  
  render() {
    const {
      newspeed
    } = this.props;
    
    return (
      <Newspeed
        newspeed={newspeed}
      />
    )
  }
}

export default connect(
  (state) => ({
    newspeed: state.post.get('newspeed')
  }),
  (dispatch) => ({
    // BaseActions: bindActionCreators(baseActions, dispatch),
    // ProfileActions: bindActionCreators(profileActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(NewspeedContainer);