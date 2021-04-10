import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import logo from './logo.svg'
import './App.css'
import AuthPage from './pages/auth/auth.page'
import MainPage from './pages/main/main.page'


function App() {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <div>About</div>
        </Route>
        <Route path="/auth">
          <AuthPage></AuthPage>
        </Route>
        <Route path="/">
          <MainPage></MainPage>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
