import React, { Component } from 'react';
import Spendings from './containers/Spendings/Spendings';
import Spending from './components/Spending/Spending';
import Table from './components/Table/Table';
import classes from './App.css';
const spend = 'http://localhost:3001/spendings';

class App extends Component {
  state = {
    spendings: []
  }

  loadData = () => {
    fetch(spend, {
        method: 'get',
        headers: {'Content-Type' : 'application/json'}
    })
    .then(response => response.json())
    .then(spendings=> {
      this.initialData(spendings);
    })
  }

  initialData = (spendings) => {
    this.setState({
      spendings: spendings
    })
  }

  componentDidMount = () => {
    this.loadData();
  }

  updateData = (spendings) => {
    if(spendings[0]){
      this.setState({ spendings:spendings})
    } else {
      this.setState({ spendings:[] })
    }
  }

  render() {
    const {spendings} = this.state;
    return (
      <div className={classes.App}>
        <Spending/>
        <Table spendings={spendings} updateData = {this.updateData}/>
        <Spendings spendings={spendings} loadData={this.loadData}/>
      </div>
    );
  }
}

export default App;