import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Writer from 'components/common/Writer';

class WriterContainer extends Component {


  render() {
    const {  } = this.props;
    const {  } = this;
    
    return (
      <div>
        <Writer
          onSubmit={}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({

  }),
  (dispatch) => ({

  })
)(WriterContainer);