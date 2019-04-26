import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NewsPeedPage, ProfilePage, DiagnosisPage, MedicinePage, CenterPage, StationPage } from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={NewsPeedPage}/>
        <Route path="/profile" component={ProfilePage}/>
        <Route path="/diagnosis" component={DiagnosisPage}/>
        <Route path="/medicine" component={MedicinePage}/>
        <Route path="/center" component={CenterPage}/>
        <Route path="/station" component={StationPage}/>
      </Switch>
    </div>
  );
};

export default App;