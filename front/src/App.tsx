import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg'
import './App.css'
import AuthPage from './pages/auth/auth.page'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <div>About</div>
        </Route>
        <Route path="/">
          <AuthPage></AuthPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
