import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { NewsPeedPage } from 'pages';

const App = () => {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={NewsPeedPage}/>
      </Switch>
    </div>
  );
};

export default App;