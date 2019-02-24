import React, { Component } from 'react';
import Spendings from './components/Spendings/Spendings';
import Table from './components/Spendings/Table';
import './App.css';
const spend = 'http://localhost:3001/spendings';

class App extends Component {
  constructor(){
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initial = 
    {
      spendings: [],
      initialSpendings: []
    }
    return initial;
  } 

  reset = () => {
    this.setState(this.getInitialState());
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
      spendings: spendings,
      initialSpendings: spendings
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
      <div className="App">
        <Table spendings={spendings} updateData = {this.updateData}></Table>
        <Spendings spendings={spendings} loadData={this.loadData}></Spendings>
      </div>
    );
  }
}

export default App;