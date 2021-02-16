import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as postActions from 'store/modules/post';

import Newspeed from 'components/post/Newspeed';

class NewspeedContainer extends Component {
  
  initializeNewspeed = async () => {
    const { PostActions } = this.props;
    await PostActions.initializeNewspeed();
  }

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
    const { isLast, loading_GET_NEWSPEED } = this.props;
    const { innerHeight } = window;
    const { scrollHeight } = document.body;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||  // IE에서는 document.documentElement를 사용
      document.body.scrollTop;

    // 스크롤링 했을 때, 브라우저의 가장 밑에서 100정도 높이가 남았을 때에 실행된다.
    if (scrollHeight - innerHeight - scrollTop < 100) {
      !isLast && !loading_GET_NEWSPEED && this.getNewspeed();
    }
  }

  componentDidMount() {
    /** initializeNewspeed() -> getNewspeed() 순으로 실행되지 않기 때문에 getNewspeed() 내부에서 받는 state가 초기화된 state 이전의 state이다.
      이를 방지하기 위해 promise chaining으로 순서를 강제한다.
      initializeNewspeed()와 getNewspeed()는 각각 Promise를 리턴하는 함수이다.
    */
    this.initializeNewspeed()
      .then(() => this.getNewspeed());
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  
  render() {
    const {
      newspeed, loading_GET_NEWSPEED, isLast,
      userId
    } = this.props;
    
    return (
      <Newspeed
        newspeed={newspeed}
        isLoading={loading_GET_NEWSPEED}
        isLast={isLast}
        filteringUserId={userId}
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