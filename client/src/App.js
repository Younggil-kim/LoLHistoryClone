import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage';
import SummonerPage from './components/views/SummonerPage';

function App() {
  return (
    <Router>
    <div>
      {/*
        A <Switch> looks through all its children <Route>
        elements and renders the first one whose path
        matches the current URL. Use a <Switch> any time
        you have multiple routes, but you want only one
        of them to render at a time
      */}
      <Switch>
        <Route exact path="/" component={LandingPage} />
        <Route exact path="/summoner" component= {SummonerPage} />
      </Switch>
    </div>
  </Router>
  );
}

export default App;
