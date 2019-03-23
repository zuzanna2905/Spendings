import React, { Component } from 'react';
import Spendings from './containers/Spendings/Spendings';
import Profile from './containers/Profile/Profile';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom';
import classes from './App.css';

class App extends Component {
  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/profile'>Profile</NavLink>
            <NavLink to='/spendings'>Spendings</NavLink>
          </nav>
          <Switch>
            <Route path='/spendings' component={Spendings} />
            <Route path='/profile' component={Profile} />
            <Route path='/' render={()=> <h1>HOME</h1>}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;