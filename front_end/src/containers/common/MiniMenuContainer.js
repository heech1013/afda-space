import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';

import MiniMenu from 'components/common/MiniMenu';

class MiniMenuContainer extends Component {
  
  render() {
    const {
      userId,  // 접근한 url의 params id
      logged, storeId  // redux store(base)로부터 받아오는 auth 정보 -> 사용자의 고유 id
    } = this.props;

    const updatable =
      (parseInt(userId) === parseInt(storeId))  // 접근한 주소의 param id와 리덕스 상 id가 일치하고
      && logged;  // 리덕스 상으로 logged 되어 있을 때
      
    return (
      <div>
        { updatable ?
          <MiniMenu
            buttonArr={['프로필', '진단명', '증상', '처방약']}
          /> : null
        }
      </div>
    )
  }
}

export default connect(
  (state) => ({
    logged: state.base.get('logged'),
    storeId: state.base.get('id')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch)
  })
)(MiniMenuContainer);