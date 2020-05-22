import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';

const UnauthoApp = ({ loginHandler }) => {

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/'>
            <Home loginHandler={loginHandler}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default UnauthoApp;
