import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as contentActions from 'store/modules/content';

import ContentList from 'components/content/ContentList';

class ContentListContainer extends Component {
  getContentList = () => {
    const { ContentActions, id, type, subType } = this.props;
    switch (subType) {
      case 'symptom': ContentActions.getContentSymptomList(type, id); break;
      case 'medicine': ContentActions.getContentMedicineList(type, id); break;
      case null:
        switch (type) {
          case 'diagnosis': ContentActions.getDiagnosisList(); break;
          case 'symptom': ContentActions.getSymptomList(); break;
          case 'medicine': ContentActions.getMedicineList(); break;
          default:
        } break;
      default:
    }
    // if (subType === null) ContentActions.getContentList(type);
    // else if (subType === 'symptom') ContentActions.getContentSymptomList(type, id);
    // else if (subType === 'medicine') ContentActions.getContentMedicineList(type, id);
  }

  componentDidMount() {
    this.getContentList();
  }

  render() {
    const {
      type, subType,
      loading_GET_DIAGNOSIS_LIST, loading_GET_SYMPTOM_LIST, loading_GET_MEDICINE_LIST, loading_GET_CONTENT_SYMPTOM_LIST, loading_GET_CONTENT_MEDICINE_LIST,
      // contentList,
      diagnosisList, symptomList, medicineList, contentSymptomList, contentMedicineList
    } = this.props;

    const rowObj = {
      "diagnosis": ["진단명", "사람 수"],
      "medicine": ["처방약", "평가 수"],
      "symptom": ["증상명", "사람 수"]
    }
    const row_1 = subType ? rowObj[subType][0] : rowObj[type][0];
    const row_2 = subType ? rowObj[subType][1] : rowObj[type][1];
    
    const contentsObj = {
      "symptom": contentSymptomList,
      "medicine": contentMedicineList
    };
    const contents = subType ? contentsObj[subType]
      :
      type === 'diagnosis' ? diagnosisList
        : type === 'symptom' ? symptomList
          : type === 'medicine' ? medicineList
            : null;

    // const to = subType ? null : type;
    // const to = (type === 'symptom' || subType === 'symptom') ? null : type;
    const to =
      (type !== 'symptom' && subType !== 'symptom') ?  // 적어도 하나가 symptom이면 null
        subType ? subType : type
        :
        null;

    if (loading_GET_DIAGNOSIS_LIST || loading_GET_SYMPTOM_LIST || loading_GET_MEDICINE_LIST || loading_GET_CONTENT_SYMPTOM_LIST || loading_GET_CONTENT_MEDICINE_LIST) return null;
    return (
      <div>
        <ContentList
          row_1={row_1}
          row_2={row_2}
          to={to}
          contents={contents}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading_GET_CONTENT_LIST: state.pender.pending['content/GET_CONTENT_LIST'],
    loading_GET_CONTENT_SYMPTOM_LIST: state.pender.pending['content/GET_CONTENT_SYMPTOM_LIST'],
    loading_GET_CONTENT_MEDICINE_LIST: state.pender.pending['content/GET_CONTENT_MEDICINE_LIST'],
    diagnosisList: state.content.get('diagnosisList'),
    symptomList: state.content.get('symptomList'),
    medicineList: state.content.get('medicineList'),
    contentSymptomList: state.content.get('contentSymptomList'),
    contentMedicineList: state.content.get('contentMedicineList')
  }),
  (dispatch) => ({
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ContentListContainer);