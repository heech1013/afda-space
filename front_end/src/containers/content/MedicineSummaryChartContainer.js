import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content/content';
import MedicineSummaryChart from 'components/content/MedicineSummaryChart';

class MedicineSummaryChartContainer extends Component {
  getChartData = async () => { try {
    const { ContentActions, id } = this.props;  // diagnosis의 PK id
    await ContentActions.getMedicineSummaryChartData(id);
  } catch (e) {} }

  componentDidMount() {
    this.getChartData();
  }

  render () {
    const { loading, chartData } = this.props;
    if (loading) return null;
    return (
      <MedicineSummaryChart
        chartData={chartData}
      />
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['content/GET_MEDICINE_SUMMARY_CHART_DATA'],
    chartData: state.content.get('medicineSummaryChartData')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(MedicineSummaryChartContainer);