import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import MedicineListContainer from 'containers/medicine/MedicineListContainer';

const MedicinePage = () => {
  return (
    <PageTemplate>
      <MedicineListContainer/>
    </PageTemplate>
  )
}

export default MedicinePage;