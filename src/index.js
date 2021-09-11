import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {Switch, Route, HashRouter} from "react-router-dom";
import News from "./News/News";
import Home from './Home';

ReactDOM.render
(
  <HashRouter basename="/">
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route path="/:id" >
        <News/>
      </Route>
    </Switch>
  </HashRouter>,
  document.getElementById('root')
);