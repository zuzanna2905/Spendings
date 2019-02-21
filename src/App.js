import React, { Component } from 'react';
import Spendings from './components/Spendings/Spendings'
import './App.css';
const url = 'http://localhost:3001/spendings';

class App extends Component {
  constructor(){
    super();
    this.state = this.getInitialState();
  }

  getInitialState = () => {
    const initial = 
    {
      spendings: []
    }
    return initial;
  } 

  reset = () => {
    this.setState(this.getInitialState());
  }

  loadData = () => {
    fetch(url, {
        method: 'get',
        headers: {'Content-Type' : 'application/json'}
    })
    .then(response => response.json())
    .then(spendings=> this.updateData(spendings))
  }

  componentDidMount = () => {
    this.loadData();
  }

  updateData = (spendings) => {
    if(spendings[0]){
      this.setState({ spendings:spendings })
    } else {
      this.setState({ spendings:[] })
    }
  }

  render() {
    const {spendings} = this.state;
    return (
      <div className="App">
          <Spendings spendings={spendings} loadData={this.loadData}></Spendings>
      </div>
    );
  }
}

export default App;