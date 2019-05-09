import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  NewsPeedPage,
  ProfilePage,
  DiagnosisPage, DiagnosisSummaryPage, DiagnosisSymptomPage, DiagnosisMedicinePage, DiagnosisNewsPeedPage,
  MedicinePage,
  CenterPage,
  StationPage
} from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={NewsPeedPage}/>
        <Route path="/profile" component={ProfilePage}/>
        
        <Route exact path="/diagnosis" component={DiagnosisPage}/>
        <Route exact path="/diagnosis/summary" component={DiagnosisSummaryPage}/>
        <Route exact path="/diagnosis/symptom" component={DiagnosisSymptomPage}/>
        <Route exact path="/diagnosis/medicine" component={DiagnosisMedicinePage}/>
        <Route exact path="/diagnosis/newspeed" component={DiagnosisNewsPeedPage}/>
        
        <Route path="/medicine" component={MedicinePage}/>
        
        <Route path="/center" component={CenterPage}/>
        
        <Route path="/station" component={StationPage}/>
      </Switch>
    </div>
  );
};

export default App;