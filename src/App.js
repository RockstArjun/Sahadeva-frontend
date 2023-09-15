import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Admin from './components/admin';
import Chat from './components/chat';
import Home from './components/pages/Home';
import SignIn from './components/pages/SignIn';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={SignIn} />
          <Route path='/chat' component={Chat} />
          <Route path='/admin' component={Admin} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
