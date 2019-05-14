import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  NewsPeedPage,
  ProfilePage, ProfileDiagnosisPage, ProfileSymptomPage, ProfileMedicinePage,
  DiagnosisPage, DiagnosisSummaryPage, DiagnosisSymptomPage, DiagnosisMedicinePage, DiagnosisNewsPeedPage,
  MedicinePage, MedicineSummaryPage, MedicineNewspeedPage,
  CenterPage, CenterPostPage,
  StationPage, StationPostPage
} from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={NewsPeedPage}/>

        <Route exact path="/profile" component={ProfilePage}/>
        <Route exact path="/profile/diagnosis" component={ProfileDiagnosisPage}/>
        <Route exact path="/profile/symptom" component={ProfileSymptomPage}/>
        <Route exact path="/profile/medicine" component={ProfileMedicinePage}/>
        
        <Route exact path="/diagnosis" component={DiagnosisPage}/>
        <Route exact path="/diagnosis/summary" component={DiagnosisSummaryPage}/>
        <Route exact path="/diagnosis/symptom" component={DiagnosisSymptomPage}/>
        <Route exact path="/diagnosis/medicine" component={DiagnosisMedicinePage}/>
        <Route exact path="/diagnosis/newspeed" component={DiagnosisNewsPeedPage}/>
        
        <Route exact path="/medicine" component={MedicinePage}/>
        <Route exact path="/medicine/summary" component={MedicineSummaryPage}/>
        <Route exact path="/medicine/newspeed" component={MedicineNewspeedPage}/>
        
        <Route exact path="/center" component={CenterPage}/>
        <Route exact path="/center/:id" component={CenterPostPage}/>
        
        <Route exact path="/station" component={StationPage}/>
        <Route exact path="/station/:id" component={StationPostPage}/>
      </Switch>
    </div>
  );
};

export default App;