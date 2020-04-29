import React from 'react';
import { BrowserRouter as Router, Switch, Route, userParams } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import NewsContainer from './components/newsContainer';
import Home from './pages/Home';

function App () {

  return (
    <Router>
    <div className="App">
      <NavBar />
      <Switch>
        <Route path='/'>
          <Home logInhandler={logInhandler} />
        </Route>
        <Route>
        <NewsContainer url={url}/>
        </Route>
      </Switch>
    </div>
    </Router>
  );
}

export default App;
