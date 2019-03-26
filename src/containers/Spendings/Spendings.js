import React, { Component } from 'react';
import Charts from '../../containers/Charts/Charts';
import Table from '../../components/Table/Table';
import AddSpending from './AddingSpending/AddingSpending';
import {Route, NavLink, Switch} from 'react-router-dom';
import classes from './Spendings.css';
import queryString from 'query-string';
import SelectData from '../../components/SelectData/SelectData';

const spend = 'http://localhost:3001/spendings';
const cat = 'http://localhost:3001/categories';

class Spendings extends Component {
    state = {
        categoryTypes : [],
        spendings: [],
        startDate: new Date(new Date().setDate((new Date()).getDate()-30)).toISOString(),
        endDate: new Date().toISOString(),
        account: 'all'
    }

    componentDidMount = () => {
        const params = '?' + queryString.stringify(
        {
            start: this.state.startDate,
            end: this.state.endDate,
            account: this.state.account
        });
        fetch(cat, {
            method: 'get',
            headers: {'Content-Type' : 'application/json'}
          })
          .then(response => response.json())
          .then(categories => {
              const categoryTypes = categories.map(c => {
                  return {
                      id: c.id,
                      value: c.category
                  }
              })
              this.setState({categoryTypes: categoryTypes})
          })
          .then(x => {
              console.log(params)
            fetch(spend + params, {
                method: 'get',
                headers: {'Content-Type' : 'application/json'},
            })
            .then(response => response.json())
            .then(spendings=> {        
                this.setState({
                    spendings: spendings
                })
            })
        })
    }

    setParams = (start, end, account) => {
        if(end <= new Date()){
            this.setState({startDate:start, endDate: end, account: account})
        }
    }

    updateData = (spendings) => {
        if(spendings[0]){
          this.setState({ spendings:spendings})
        } else {
          this.setState({ spendings:[] })
        }
    }  

    InputChangeHandler = (event) => {
        console.log(event.target);
        const {name, value} = event.target; 
        this.setState({[name]: value})
        console.log(this.state)
    }


    render() {
        return (
            <div className={classes.Spendings}>
                <SelectData 
                    params={this.props.setParams}
                    changes={this.InputChangeHandler}
                />
                <nav>
                    <NavLink to={this.props.match.url + '/table'}> Spending Table</NavLink>
                    <NavLink to={this.props.match.url + '/charts'}> Spending Charts</NavLink>
                    <NavLink to={this.props.match.url + '/new'}>Add Spending</NavLink>
                </nav>
                <Switch>
                    <Route 
                        path={this.props.match.url + '/table'} 
                        render={
                            (props) => <Table 
                                categoryTypes={this.state.categoryTypes} 
                                spendings={this.state.spendings}
                            />
                        }
                    />
                    <Route 
                        path={this.props.match.url + '/charts'} 
                        render={
                            (props)=> <Charts 
                                spendings={this.state.spendings}
                            />
                        }
                    />
                    <Route 
                        path={this.props.match.url + '/new'} 
                        render={
                            ()=> <AddSpending />
                        }
                    />
                </Switch>
            </div>
        );
    }
}

export default Spendings;