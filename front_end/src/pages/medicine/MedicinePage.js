import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
// import MedicineListContainer from 'containers/medicine/MedicineListContainer';
import ContentListContainer from 'containers/content/ContentListContainer';

const MedicinePage = () => {
  return (
    <PageTemplate>
      {/* <MedicineListContainer/> */}
      <ContentListContainer
        type={'medicine'}
        subType={null}/>
    </PageTemplate>
  )
}

export default MedicinePage;