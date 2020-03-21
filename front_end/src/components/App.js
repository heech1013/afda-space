import React from 'react';
import { Switch, Route } from 'react-router-dom';
import {
  MainPage,
  // NewsPeedPage,
  LoginPage, JoinPage,
  ProfilePage, ProfileDiagnosisPage, ProfileSymptomPage, ProfileMedicinePage,
  DiagnosisPage, DiagnosisSummaryPage, DiagnosisSymptomPage, DiagnosisMedicinePage, DiagnosisNewsPeedPage,
  MedicinePage, MedicineSummaryPage, MedicineNewspeedPage,
  // CenterPage, CenterPostPage,
  StationPage, StationPostPage,
  ClosedPage
} from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={MainPage}/>

        <Route exact path="/login" component={LoginPage}/>
        <Route exact path="/join" component={JoinPage}/>

        <Route exact path="/profile/:id" component={ProfilePage}/>
        <Route exact path="/profile/:id/diagnosis" component={ProfileDiagnosisPage}/>
        <Route exact path="/profile/:id/symptom" component={ProfileSymptomPage}/>
        <Route exact path="/profile/:id/medicine" component={ProfileMedicinePage}/>
        
        <Route exact path="/diagnosis" component={DiagnosisPage}/>
        <Route exact path="/diagnosis/:id/summary" component={DiagnosisSummaryPage}/>
        <Route exact path="/diagnosis/:id/symptom" component={DiagnosisSymptomPage}/>
        <Route exact path="/diagnosis/:id/medicine" component={DiagnosisMedicinePage}/>
        {/** closed */} <Route exact path="/diagnosis/:id/newspeed" component={DiagnosisNewsPeedPage}/>
        
        <Route exact path="/medicine" component={MedicinePage}/>
        <Route exact path="/medicine/:id/summary" component={MedicineSummaryPage}/>
        {/** closed */} <Route exact path="/medicine/:id/newspeed" component={MedicineNewspeedPage}/>
        
        {/* <Route exact path="/center" component={CenterPage}/>
        <Route exact path="/center/:id" component={CenterPostPage}/> */}
        {/** Closed pages... */} <Route exact path="/center" component={ClosedPage}/>
        {/** Closed pages... */} <Route exact path="/center/:id" component={ClosedPage}/>
        
        <Route exact path="/station" component={StationPage}/>
        <Route exact path="/station/:id" component={StationPostPage}/>

        <Route exact path="/newspeed" component={ClosedPage}/>

      </Switch>
    </div>
  );
};

export default App;