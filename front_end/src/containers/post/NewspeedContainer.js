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

  handleScroll = () => {
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||  // IE에서는 document.documentElement를 사용
      document.body.scrollTop;

      // 스크롤링 했을 때, 브라우저의 가장 밑에서 100정도 높이가 남았을 때에 실행된다.
      if (scrollHeight - innerHeight - scrollTop < 100) {
        console.log("Almost Bottom of this browser");
      }
  }

  componentDidMount() {
    this.getNewspeed();
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  
  render() {
    const {
      loading_GET_MORE_NEWSPEED, newspeed
    } = this.props;
    
    return (
      <Newspeed
        newspeed={newspeed}
        isLoading={loading_GET_MORE_NEWSPEED}
      />
    )
  }
}

export default connect(
  (state) => ({
    loading_GET_MORE_NEWSPEED: state.pender.pending['post/GET_MORE_NEWSPEED'],
    newspeed: state.post.get('newspeed')
  }),
  (dispatch) => ({
    // BaseActions: bindActionCreators(baseActions, dispatch),
    // ProfileActions: bindActionCreators(profileActions, dispatch),
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(NewspeedContainer);