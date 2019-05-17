import React, { Component } from 'react';
import Home from './components/Home/Home';
import Spendings from './containers/Spendings/Spendings';
import Profile from './containers/Profile/Profile';
import Reports from './containers/Reports/Reports';
import Signup from './components/Session/Signup/Signup';
import Login from './components/Session/Login/Login';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    // !!!!!!!! - ostatecznie pobieranie kluczowych danych ma być przy logowaniu
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/home' component={Home} />
            <Route path='/spendings' component={Spendings} />
            <Route path='/profile' component={Profile} />
            <Route path='/reports' component={Reports}/>
            <Route path='/signup' component={Signup}/>
            <Route path='/login' component={Login}/>
            <Redirect from='/' to='/home'/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;