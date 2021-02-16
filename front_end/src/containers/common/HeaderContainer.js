import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';

import Header from 'components/common/Header';

class HeaderContainer extends Component {
  checkJWT = (token) => {
    const { BaseActions } = this.props;
    BaseActions.checkJWT(token);
  }

  handleLogout = () => {
    const { BaseActions } = this.props;
    localStorage.removeItem('jwt');
    BaseActions.logout();
  }
  
  componentDidMount() {
    const { logged } = this.props;
    if (!logged && localStorage.jwt) {  // 로그인 한 채로 새로고침해서 redux store가 날라갔을 경우
      this.checkJWT(localStorage.jwt);
    }
  }

  render() {
    const { logged, id } = this.props;
    const { handleLogout } = this;
    return (
      <div>
        <Header
          logged={logged}
          id={id}
          onLogout={handleLogout}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    id: state.base.get('id')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(HeaderContainer);