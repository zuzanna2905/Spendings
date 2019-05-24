import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import XYPlot from '../../../components/XYPlot/XYPlot';
import RadialChart from '../../../components/RadialChart/RadialChart';
import classes from './Charts.css';
import Select from '../../../components/UI/Select/Select';
import CategoryChart from '../../../components/Chart/CategoryChart/CategoryChart';

class Charts extends Component {
    state = {
        filtered : {
            id: 'Filter spendings by ',
            value: 'Week',
            options: [
                {id: 1, name: 'Day'},
                {id: 2, name: 'Week'},
                {id: 3, name: 'Month'},
                {id: 4, name: 'Year'},
                {id: 5, name: 'All'}
            ]
        },
        showing: 'plot',
        category: {name: 'sport', id: 3},
        counts: [
            {id: 1, name: 1}, 
            {id: 2, name: 2}, 
            {id: 3, name: 3}, 
            {id: 4, name: 4}, 
            {id: 5, name: 5}, 
            {id: 6, name: 6}, 
            {id: 7, name: 7}, 
        ],
        count: 5,
        account: {name: 'All', id: 'All'},
        difference: 5
    }

    setCategory = (event) => {
        const category = this.props.cats.filter(f => f.name === event)
        this.setState({category: category[0]})
    }

    setAccount = (event) => {
        if(event === 'All'){
            this.setState({account: {name: 'All', id: 'All'}})
        } else {    
            let account = this.props.accs.filter(f => f.name === event)
            this.setState({account: account[0]})
        }
    }

    setCount = (event) => {
        this.setState({count: event, difference: event})
    }

    setShow = (event) => {
        this.setState({showing: event})
    }

    showData = (filteredData) => {
        const {difference} = this.state;
        let filteredArray= this.filterByAccount(filteredData);
        return this.filterByDate(filteredArray, difference);
    }

    filterByDate = (filteredArray, difference, count = 0) => {
        switch(this.state.filtered.value) {
            case 'Day':
                return filteredArray.filter(f => {
                    let today = moment().subtract(count, 'd').format('YYYY-MM-DD');
                    let beforeToday = moment().subtract(count+difference, 'd').format('YYYY-MM-DD');
                    return f.date <= today && f.date > beforeToday
                })
            case 'Week':
                return filteredArray.filter(f => {
                    let week = moment().subtract(count, 'w').format('YYYY-MM-DD');
                    let beforeWeek = moment().subtract(count+difference, 'w').format('YYYY-MM-DD');
                    return f.date <= week && f.date > beforeWeek
                })
            case 'Month':
                return filteredArray.filter(f => {
                    let month = moment().subtract(count, 'M').format('YYYY-MM-DD');
                    let beforeMonth = moment().subtract(count+difference, 'M').format('YYYY-MM-DD');
                    return f.date <= month && f.date > beforeMonth
                })
            case 'Year':
                return filteredArray.filter(f => {
                    let year = moment().subtract(count, 'y').format('YYYY-MM-DD');
                    let beforeYear = moment().subtract(count+difference, 'y').format('YYYY-MM-DD');
                    return f.date <= year && f.date > beforeYear
                })
            case 'All':
                return filteredArray.filter(f => {
                    return filteredArray
                })
            default:
                return filteredArray
        }
    }

    filterByAccount = (array) => {
        if(this.state.account.id === 'All')
            return array
        const account = array.filter(a => a.account === this.state.account.id);
        return account;
    }

    getData = (array) => {
        const data = array.map((a, i) => {
            return {
                x: i+1,
                y: a.value
            }
        })
        return data;
    } 

    getValues = (data) => {
        const values = data.map(a => {return a.value})
        return values;
    }
    
    sumCat = (sum, number) => {
        return sum + parseInt(number.value)
    };

    sumByCategory = (array) => {
        const values = this.props.cats.map(c=> {
                return {
                x: c.name,
                value: array.filter(a => a.category === c.id)
                .reduce(this.sumCat,0)
            }})
        return values;
    }

    RadialCategory = (array) => {
        const categories = this.props.cats.map(c => {
                return {
                label: c.name,
                angle: array.filter(a => a.category === c.id)
                .reduce(this.sumCat,0)
            }})
        const values = categories.filter(c => c.angle !== 0);
        return values;
    }

    CategoryData = (array) => {
        const category = array.filter(a => a.category === this.state.category.id);
        let values = []
        for(let i = this.state.count-1; i >= 0; i--){
            values.push(this.RadialCategory(this.filterByDate(category, 1, i))[0])
        }
        return values;
    }
    
    getRowsByCat = (array,cat) => {
        const values = array.filter(x => x.category === cat);
        return values;
    }

    getMin = (array) => {
        return Math.min(...this.getValues(array))
    }

    getMax = (array) => {
        return Math.max(...this.getValues(array))
    }

    getMaxCat = (array) => {
        return Math.max(...this.props.cats.map((c) => {
                return array.filter(a => a.category === c.id)
                .reduce(this.sumCat,0)
        }))
    }

    selection = (data) => { 
        return (
            data.map((x,y) => 
                <option key={y}>{x}</option>
            )
        )
    }

    getLenght = (array) => {
        return array.length;
    }

    inputHandler = (e) => {
        let filtered = { ...this.state.filtered};
        filtered.value = e;
        this.setState({filtered: filtered})
    }

    render() {
        const {spendings, cats, accs} = this.props;
        const { showing, filtered, counts, count, account, category } = this.state;
        let charts = <h1>NO DATA FOR DISPLAY</h1>;
        if(spendings){
            charts = <Fragment>
                <h3>Choose chart</h3>
                <button onClick={() => this.setShow('plot')}>Plot</button>
                <button onClick={() => this.setShow('radial')}>Radial</button>
                <button onClick={() => this.setShow('category')}>Category</button>
                <div className={classes.Filter}>
                    <Select
                        value={count} 
                        label={ filtered.id } 
                        options={counts}
                        changed={(e) => this.setCount(e.target.value)}
                    />
                    <Select
                        value={filtered.value} 
                        options={filtered.options}
                        changed={(e) => this.inputHandler(e.target.value)}
                    />
                    <Select
                        value={account.name} 
                        options={[{id:'All', name: 'All'},...accs]}
                        changed={(e) => this.setAccount(e.target.value)}
                    />
                    {showing === 'category' ? 
                        <Select
                            value={category.name} 
                            options={cats}
                            changed={(e) => this.setCategory(e.target.value)}
                        /> : null
                    }
                </div>
                
                <div className={classes.Charts}>
                
                {showing === 'radial'  ?
                    <RadialChart 
                    data={this.RadialCategory(this.showData(spendings))} 
                    title={`[Last ${filtered.value} Spendings]`}
                    /> : null
                }
                { showing === 'plot' ? 
                    <XYPlot 
                        max={this.getMaxCat(this.showData(spendings))} 
                        data={this.sumByCategory(this.showData(spendings))}
                        chartLabelY={"[Categories]"}
                        chartLabelX={"[Values]"}
                        chartTitle={`[Last ${filtered.value} Spendings]`}
                    /> : null}
                { showing === 'category' ?                     
                    <CategoryChart 
                    data={this.CategoryData(spendings)} 
                    />
                    : null
                }
                </div>
            </Fragment>
        }
        return (
            <div className={classes.Container}>
                {charts}
            </div>
        );
    }}


const mapStateToProps = state => {
    return {
        spendings: state.spend.spendings,
        columns: state.spend.columns,
        cats: state.spend.categories,
        accs: state.prof.accounts
    }
}

export default connect(mapStateToProps)(Charts);    
