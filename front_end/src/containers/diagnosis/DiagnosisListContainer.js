import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as diagnosisListActions from 'store/modules/diagnosisList';

import ContentList from 'components/content/ContentList';

class DiagnosisListContainer extends Component {
  getDiagnosisList = () => {
    const { DiagnosisListActions } = this.props;
    DiagnosisListActions.getDiagnosisList();
  }

  componentDidMount() {
    this.getDiagnosisList();
  }

  render() {
    const { loading, diagnosisList } = this.props;
    if (loading) return null;
    return (
      <div>
        <ContentList
          row_1={'진단명'}
          // row_2={'사람 수'}
          to={'diagnosis'}
          contents={diagnosisList}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['diagnosisList/GET_DIAGNOSIS_LIST'],
    diagnosisList: state.diagnosisList.get('diagnosisList')
  }),
  (dispatch) => ({
    DiagnosisListActions: bindActionCreators(diagnosisListActions, dispatch)
  })
)(DiagnosisListContainer);