import React, { Component } from 'react';
import Spendings from './containers/Spendings/Spendings';
import Profile from './containers/Profile/Profile';
import Reports from './containers/Reports/Reports';
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
            <Route path='/reports' component={Reports}/>
            <Redirect from='/' to='/spendings'/>
          </Switch>
        </Layout>
      </BrowserRouter>
    );
  }
}

export default App;