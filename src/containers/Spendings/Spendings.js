import React, { Component, Fragment } from 'react';
import Charts from '../../containers/Charts/Charts';
import Table from '../../components/Table/Table';
import {Route, NavLink, Switch} from 'react-router-dom';

const spend = 'http://localhost:3001/spendings';
const cat = 'http://localhost:3001/categories';

class Spendings extends Component {
    state = {
        categoryTypes : [],
        spendings: []
    }

    componentDidMount = () => {
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
            fetch(spend, {
                method: 'get',
                headers: {'Content-Type' : 'application/json'}
            })
            .then(response => response.json())
            .then(spendings=> {        
                this.setState({
                    spendings: spendings
                })
            })
        })
    }


    updateData = (spendings) => {
        if(spendings[0]){
          this.setState({ spendings:spendings})
        } else {
          this.setState({ spendings:[] })
        }
    }  

    render() {
        return (
            <Fragment>
                <NavLink to={this.props.match.url + '/table'}> Spending Table</NavLink>
                <NavLink to={this.props.match.url + '/charts'}> Spending Charts</NavLink>
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
                </Switch>
            </Fragment>
        );
    }
}

export default Spendings;