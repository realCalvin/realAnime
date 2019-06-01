import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Dashboard from './components/info/Dashboard'
import AnimeInfo from './components/info/AnimeInfo'
import SignUp from './components/auth/SignUp'

function App() {

  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path='/anime' component={Dashboard} />
          <Route path='/anime/:id' component={AnimeInfo} />
          <Route path='/register' component={SignUp} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
