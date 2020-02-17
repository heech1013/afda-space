import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content/content';
import DiagnosisSummaryChart from 'components/content/DiagnosisSummaryChart';

class DiagnosisSummaryChartContainer extends Component {
  getChartData = async () => { try {
    const { ContentActions, id } = this.props;  // diagnosis의 PK id
    await ContentActions.getDiagnosisSummaryChartData(id);
  } catch (e) {} }

  componentDidMount() {
    this.getChartData();
  }

  render () {
    const { chartData } = this.props;
    return (
      <DiagnosisSummaryChart
        chartData={chartData}
      />
    )
  }
}

export default connect(
  (state) => ({
    chartData: state.content.get('diagnosisSummaryChartData')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(DiagnosisSummaryChartContainer);