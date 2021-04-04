import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content';
import DiagnosisSummaryChart from 'components/content/DiagnosisSummaryChart';

class DiagnosisSummaryChartContainer extends Component {
  getChartData = async () => {
    const { ContentActions, id } = this.props;  // diagnosis의 PK id
    await ContentActions.getDiagnosisSummaryChartData(id);
  }

  componentDidMount() {
    this.getChartData();
  }

  render () {
    const { loading, chartData } = this.props;
    if (loading) return null;
    return (
      <DiagnosisSummaryChart
        chartData={chartData}
      />
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['content/GET_DIAGNOSIS_SUMMARY_CHART_DATA'],
    chartData: state.content.get('diagnosisSummaryChartData')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(DiagnosisSummaryChartContainer);