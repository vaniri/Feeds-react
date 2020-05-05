import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/navBar';
import Home from './pages/Home';
import Sources from './pages/Sources';

function App() {

  return (
    <Router>
      <div className="App">
        <NavBar />
        <Switch>
          <Route path='/sources'>
            <Sources />
          </Route>
          <Route path='/'>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
