import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import * as actions from './store/actions/index';
import { connect } from 'react-redux';
import Home from './components/Home/Home';
import Spendings from './containers/Spendings/Spendings';
import Profile from './containers/Profile/Profile';
import Reports from './containers/Reports/Reports';
import Signup from './containers/Session/Signup/Signup';
import Login from './containers/Session/Login/Login';
import Logout from './containers/Session/Logout/Logout';
import Charts from './containers/Spendings/Charts/Charts';
import Layout from './hoc/Layout/Layout';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/home' exact component={Home} />
        <Route path='/signup' component={Signup}/>
        <Route path='/login' component={Login}/>
        <Redirect path='/' to='/home' />
      </Switch>
    )
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/spendings' component={Spendings} />
          <Route path='/profile' component={Profile} />
          <Route path='/reports' component={Reports}/>
          <Route path='/charts' component={Charts}/>
          <Route path='/logout' component={Logout}/>
          <Redirect path='/' to='/spendings'/>
      </Switch>
      )
    }
    return (
      <BrowserRouter>
        <Layout>
          {routes}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.sess.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);