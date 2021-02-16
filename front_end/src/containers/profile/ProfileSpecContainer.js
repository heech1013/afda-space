import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base';
import * as profileActions from 'store/modules/profile';
import * as contentActions from 'store/modules/content';

import ProfileSpec from 'components/profile/ProfileSpec';

class ProfileSpecContainer extends Component {
  getContentList = async () => {
    const { ProfileActions, userId: id } = this.props;
    await ProfileActions.getUserDiagnosisList(id);
    await ProfileActions.getUserMedicineList(id);
    await ProfileActions.getUserSymptomList(id);
  }

  componentDidMount() {
    this.getContentList();
  }
  
  render() {
    const { diagnosisList = null, medicineList = null, symptomList = null } = this.props;

    return (
      <ProfileSpec
        diagnosisList={diagnosisList}
        medicineList={medicineList}
        symptomList={symptomList}
      />
    )
  }
}

export default connect(
  (state) => ({
    diagnosisList: state.profile.get('diagnosisList'),
    medicineList: state.profile.get('medicineList'),
    symptomList: state.profile.get('symptomList')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ProfileActions: bindActionCreators(profileActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ProfileSpecContainer);