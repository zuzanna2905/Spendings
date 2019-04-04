import React, { Component } from 'react';
import Spendings from './containers/Spendings/Spendings';
import Profile from './containers/Profile/Profile';
import Home from './components/Home/Home';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route path='/spendings' component={Spendings} />
            <Route path='/profile' component={Profile} />
            <Route path='/home' component={Home}/>
            <Redirect from='/' to='/home'/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;