import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post/post';

import Newspeed from 'components/post/Newspeed';

class NewspeedContainer extends Component {
  
  getNewspeed = async () => {
    const {
      PostActions,
      userId,  // 특정 유저 profile의 newspeed일 경우 전달 받음, 메인 페이지 newspeed일 경우 'undefined'(string)
      lastPostId, lastActivityId
    } = this.props;
    
    /** getNewspeed()
     * @param userId : 'undefined'를 넘겨줄 경우 where 조건문 없이 퀴리문을 작성.
     */
    await PostActions.getNewspeed(userId, lastPostId, lastActivityId);
  }

  handleScroll = () => {
    const { isLast } = this.props;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||  // IE에서는 document.documentElement를 사용
      document.body.scrollTop;

      // 스크롤링 했을 때, 브라우저의 가장 밑에서 100정도 높이가 남았을 때에 실행된다.
      if (scrollHeight - innerHeight - scrollTop < 100) {
        !isLast && this.getNewspeed();
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
      loading_GET_NEWSPEED, newspeed
    } = this.props;
    
    return (
      <Newspeed
        newspeed={newspeed}
        isLoading={loading_GET_NEWSPEED}
      />
    )
  }
}

export default connect(
  (state) => ({
    loading_GET_NEWSPEED: state.pender.pending['post/GET_NEWSPEED'],
    newspeed: state.post.get('newspeed'),
    isLast: state.post.get('isLast'),
    lastPostId: state.post.get('lastPostId'),
    lastActivityId: state.post.get('lastActivityId')
  }),
  (dispatch) => ({
    PostActions: bindActionCreators(postActions, dispatch)
  })
)(NewspeedContainer);