import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content';
import DiagnosisMedicineChart from 'components/content/DiagnosisMedicineChart';

class DiagnosisMedicineChartContainer extends Component {
  getChartData = async () => { try {
    const { ContentActions, id } = this.props;  // diagnosis의 PK id
    await ContentActions.getDiagnosisMedicineChartData(id);
  } catch (e) {} }

  componentDidMount() {
    this.getChartData();
  }

  render () {
    const { loading, chartData } = this.props;
    if (loading) return null;
    return (
      <DiagnosisMedicineChart
        chartData={chartData}
      />
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['content/GET_DIAGNOSIS_MEDICINE_CHART_DATA'],
    chartData: state.content.get('diagnosisMedicineChartData')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(DiagnosisMedicineChartContainer);