import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as medicineListActions from 'store/modules/medicineList';

import ContentList from 'components/content/ContentList';

class MedicineListContainer extends Component {
  getMedicineList = () => {
    const { MedicineListActions } = this.props;
    console.log(MedicineListActions);
    MedicineListActions.getMedicineList();
  }

  componentDidMount() {
    console.log('===CDM===');
    this.getMedicineList();
  }

  render() {
    const { loading, medicineList } = this.props;
    if (loading) return null;
    return (
      <div>
        <ContentList
          row_1={'처방약'}
          // row_2={'평가 수}
          to={'medicine'}
          contents={medicineList}
        />
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['medicineList/GET_MEDICINE_LIST'],
    medicineList: state.medicineList.get('medicineList')
  }),
  (dispatch) => ({
    MedicineListActions: bindActionCreators(medicineListActions, dispatch)
  })
)(MedicineListContainer);