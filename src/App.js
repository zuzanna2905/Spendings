import React, { Component } from 'react';
import Charts from './containers/Charts/Charts';
import Table from './components/Table/Table';
import {BrowserRouter, Route, NavLink, Switch} from 'react-router-dom';
import classes from './App.css';

class App extends Component {
  // <AddingSpending/>
  // <Table spendings={spendings} updateData = {this.updateData}/>
  // <Charts spendings={spendings} loadData={this.loadData}/>

  render() {
    return (
      <div className={classes.App}>
        <BrowserRouter>
          <nav>
            <NavLink to='/'>Home</NavLink>
            <NavLink to='/spending_table'>Table</NavLink>
            <NavLink to='/charts'>Charts</NavLink>
          </nav>
          <Switch>
            <Route path='/spending_table' component={Table} />
            <Route path='/charts' component={Charts} />
            <Route path='/' render={()=> <h1>HOME</h1>}/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;