import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as diagnosisSummaryActions from 'store/modules/diagnosisSummary';

import ContentTitle from 'components/content/ContentTitle';
import Description from 'components/content/Description';

class DiagnosisSummaryContainer extends Component {
  getDiagnosisSummary = () => {
    const { DiagnosisSummaryActions, diagnosisId } = this.props;
    DiagnosisSummaryActions.getDiagnosisSummary(diagnosisId);
  }

  componentDidMount() {
    this.getDiagnosisSummary();
  }

  render() {
    const { loading, diagnosisSummary } = this.props;
    console.log(diagnosisSummary);
    const { nameKr, nameEn, description } = diagnosisSummary.toJS();
    if (loading) return null;
    return (
      <div>
        <ContentTitle
          nameKr={nameKr}
          nameEn={nameEn}
          buttonString={'내 프로필에 추가'}
          onClick={() => console.log('add diagnosis to my profile')}/>
        <Description
          nameKr={nameKr}
          content={description}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['diagnosisSummary/GET_DIAGNOSIS_SUMMARY'],
    diagnosisSummary: state.diagnosisSummary.get('diagnosisSummary')
  }),
  (dispatch) => ({
    DiagnosisSummaryActions: bindActionCreators(diagnosisSummaryActions, dispatch)
  })
)(DiagnosisSummaryContainer);