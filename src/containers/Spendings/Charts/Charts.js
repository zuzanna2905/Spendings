import React, { Component, Fragment } from 'react';
import XYPlot from '../../../components/XYPlot/XYPlot';
import RadialChart from '../../../components/RadialChart/RadialChart';
import classes from './Charts.css';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from '../../../components/UI/Select/Select';
import CategoryChart from '../../../components/Chart/CategoryChart/CategoryChart';

class Charts extends Component {
    state = {
        filtered : {
            id: 'Filter spendings by ',
            value: 'Week',
            options: [
                {id: 1, value: 'Day'},
                {id: 2, value: 'Week'},
                {id: 3, value: 'Month'},
                {id: 4, value: 'Year'},
                {id: 5, value: 'All'}
            ]
        },
        showing: 'category',
        category: {name: 'sport', id: 3},
        count: 4
    }

    setShow = (event) => {
        this.setState({showing: event})
    }

    showData = (filteredData, count=0) => {
        switch(this.state.filtered.value) {
            case 'Day':
                return filteredData.filter(f => {
                    let today = moment().subtract(count, 'd').format('YYYY-MM-DD');
                    let beforeToday = moment().subtract(count+1, 'd').format('YYYY-MM-DD');
                    return f.date <= today && f.date > beforeToday
                })
            case 'Week':
                return filteredData.filter(f => {
                    let week = moment().subtract(count, 'w').format('YYYY-MM-DD');
                    let beforeWeek = moment().subtract(count+1, 'w').format('YYYY-MM-DD');
                    return f.date <= week && f.date > beforeWeek
                })
            case 'Month':
                return filteredData.filter(f => {
                    let month = moment().subtract(count, 'M').format('YYYY-MM-DD');
                    let beforeMonth = moment().subtract(count+1, 'M').format('YYYY-MM-DD');
                    return f.date <= month && f.date > beforeMonth
                })
            case 'Year':
                return filteredData.filter(f => {
                    let year = moment().subtract(count, 'y').format('YYYY-MM-DD');
                    let beforeYear = moment().subtract(count+1, 'y').format('YYYY-MM-DD');
                    return f.date <= year && f.date > beforeYear
                })
            case 'All':
                return filteredData.filter(f => {
                    return filteredData
                })
            default:
                return filteredData
        }
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
            values.push(this.RadialCategory(this.showData(category, i))[0])
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
        const {spendings} = this.props;
        const {showing } = this.state;
        const filtered = {...this.state.filtered};
        let charts = <h1>NO DATA FOR DISPLAY</h1>;
        if(spendings){
            charts = <Fragment>
                <button onClick={() => this.setShow('radial')}>Radial</button>
                <button onClick={() => this.setShow('plot')}>Plot</button>
                <button onClick={() => this.setShow('category')}>Category</button>
                <div className={classes.Filter}>
                    <Select
                        value={filtered.value} 
                        name={showing=== 'category' ? 'Filter ' + this.state.category.name + ' by last ' + this.state.count + ' ': filtered.id} 
                        options={filtered.options}
                        changed={(e) => this.inputHandler(e.target.value)}
                    />
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
        cats: state.spend.categories
    }
}

export default connect(mapStateToProps)(Charts);    
