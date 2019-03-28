import React, { Component } from 'react';
import SelectData from '../../components/SelectData/SelectData';
import Table from '../../components/Table/Table';
import Charts from '../Charts/Charts';
import AddSpending from './AddingSpending/AddingSpending';
import {NavLink, Route} from 'react-router-dom';
import classes from './Spendings.css';
//import queryString from 'query-string';
import moment from 'moment';
import { connect } from 'react-redux';

//const spend = 'http://localhost:3001/spendings';
//const cat = 'http://localhost:3001/categories';

class Spendings extends Component {
    state = {
        paramsInputs : {
            startDate: {
              type: 'input', 
              elementConfig: {
                  type: 'date',
                  placeholder: 'Start Date'
              },
              value: moment().day(-30).format('YYYY-MM-DD'),
              validation: {
                  required: true
              },
              valid: false,
              touched: false
            },
            endDate: {
              type: 'input', 
              elementConfig: {
                type: 'date',
                placeholder: 'End Date'
              },
              value: moment().format('YYYY-MM-DD'),
              validation: {
                  required: true
              },
              valid: false,
              touched: false
            },
            account: {
              type: 'select', 
              elementConfig: {
                  options: [
                      {value: 'Zuzanna Konto'},
                      {value: 'Piotr Konto'},
                      {value: 'Zuzanna 2'}, 
                      {value: 'Piotr 2'}
                  ]
              },
              value: '',
              validation: {
                  required: true
              },
              valid: false,
              touched: false
            }
          },
        formIsValid: false
    }

    componentDidUpdate = (nextProps, nextState) => {
        // if(nextState.paramsInputs === this.state.paramsInputs){
        //     return;
        // }
        // const query = '?' + queryString.stringify({
        //     start : new Date(this.state.paramsInputs.startDate.value).toISOString(),
        //     end :  new Date(this.state.paramsInputs.endDate.value).toISOString(),
        //     account : this.state.paramsInputs.account.value
        // });
        // console.log(query)
        // fetch(cat, {
        //     method: 'get',
        //     headers: {'Content-Type' : 'application/json'}
        //   })
        //   .then(response => response.json())
        //   .then(categories => {
        //       const categoryTypes = categories.map(c => {
        //           return {
        //               id: c.id,
        //               value: c.category
        //           }
        //       })
        //       this.setState({categoryTypes: categoryTypes})
        //   })
        //   .then(x => {
        //     fetch(spend + query, {
        //         method: 'get',
        //         headers: {'Content-Type' : 'application/json'},
        //     })
        //     .then(response => response.json())
        //     .then(spendings=> {        
        //         this.setState({
        //             spendings: spendings
        //         })
        //     })
        // })
    }

    inputHandler = (e, inputID) => {
        let inputForm = { ...this.state.paramsInputs};
        let element = { ...inputForm[inputID]};
        element.value = e.target.value;
        element.touched = true;
        inputForm[inputID] = element;
        let formIsValid = true;
        for(let i in inputForm){
            formIsValid = inputForm[i].valid && formIsValid;
        }
        this.setState({paramsInputs: inputForm, formIsValid: formIsValid});
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
            <div className={classes.Spendings}>
                <SelectData 
                    paramsInputs={this.state.paramsInputs}
                    inputHandler={this.inputHandler}
                />
                <nav className={classes.Navigation}>
                    <NavLink to={this.props.match.url + '/table'}> Spending Table</NavLink>
                    <NavLink to={this.props.match.url + '/charts'}> Spending Charts</NavLink>
                    <NavLink to={this.props.match.url + '/new'}>Add Spending</NavLink>
                </nav>
                
            <Route path={this.props.match.path + '/table'} 
            render={(props) => <Table 
                    categoryTypes={this.state.categoryTypes} 
                    spendings={this.state.spendings}
                    {...props}/>}/>
            <Route path={this.props.match.path + '/charts'} 
            render={(props)=> <Charts 
                    spendings={this.state.spendings}
                    {...props} />}/>
            <Route path={this.props.match.path + '/new'} 
            render={(props)=> <AddSpending  {...props}/>}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = dispatch => {
    return {

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Spendings);