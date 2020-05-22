import React from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from 'react-router-dom';
import NavBar from './components/navBar';
import Sources from './pages/Sources';
import News from './pages/News';
import NewsWithComments from './pages/NewsWithComments';
import '../style/index.css';

const authoApp = ({ logoutHandler }) => {

  let AllNews = () => {
    let { source } = useParams();
    return (
      <News source={source} />
    )
  }

  let NewsComments = () => {
    let { newsId } = useParams();
    return (
      <NewsWithComments newsId={newsId} />
    )
  }

  return (
    <Router>
      <div className="App">
        <NavBar logoutHandler={logoutHandler}/>
        <Switch>
          <Route path='/news/:newsId'>
            <NewsComments />
          </Route>
          <Route path='/source/:source'>
            <AllNews />
          </Route>
          <Route path='/'>
          <Sources />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default authoApp
