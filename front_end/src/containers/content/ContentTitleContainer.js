import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as baseActions from 'store/modules/base/base';
import * as contentActions from 'store/modules/content/content';

import ContentTitle from 'components/content/ContentTitle';

class ContentTitleContainer extends Component {
  getContent = async() => {
    const { ContentActions, type, id } = this.props;
    await ContentActions.getContent(type, id);
  }

  handleModal = () => {
    const { BaseActions, buttonString } = this.props;
    switch (buttonString) {
      case '새 진단명 추가':  /** 내 프로필/진단명/새 진단명 추가 */
        BaseActions.showModal('profileDiagnosisAdd');
        break;
      case '새 증상 추가':  /** 내 프로필/증상/새 증상 추가 */
        BaseActions.showModal('profileSymptomAdd');
        break;
      case '새 처방약 추가':  /** 내 프로필/처방약/새 처방약 축가 */
        BaseActions.showModal('profileMedicineAdd');
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    this.getContent();
  }

  render() {
    const { loading, content, buttonString } = this.props;
    const { handleModal } = this;
    const { nameKr, nameEn } = content.toJS();
    if (loading) return null;
    return (
      <div>
        <ContentTitle
          nameKr={nameKr}
          nameEn={nameEn}
          buttonString={buttonString}
          onClick={handleModal}/>
      </div>
    )
  }
}

export default connect(
  (state) => ({
    loading: state.pender.pending['content/GET_CONTENT'],
    content: state.content.get('content')
  }),
  (dispatch) => ({
    BaseActions: bindActionCreators(baseActions, dispatch),
    ContentActions: bindActionCreators(contentActions, dispatch)
  })
)(ContentTitleContainer);