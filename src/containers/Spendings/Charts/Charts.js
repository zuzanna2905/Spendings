import React, { Component, Fragment } from 'react';
import XYPlot from '../../../components/XYPlot/XYPlot';
import RadialChart from '../../../components/RadialChart/RadialChart';
import classes from './Charts.css';
import { connect } from 'react-redux';
import moment from 'moment';
import Select from '../../../components/UI/Select/Select';

class Charts extends Component {
    state = {
        filtered : {
            id: 'Filter spendings by date ', 
            value: 'Year',
            options: [
                {id: 1, value: 'Day'},
                {id: 2, value: 'Week'},
                {id: 3, value: 'Month'},
                {id: 4, value: 'Year'},
                {id: 5, value: 'All'}
            ]
        }
        //todo: account filters
    }

    showData = () => {
        const filteredData = this.props.spendings;
        switch(this.state.filtered.value) {
            case 'Day':
                return filteredData.filter(f => {
                    let today = moment().format('YYYY-MM-DD');
                    return f.date >= today
                })
            case 'Week':
                return filteredData.filter(f => {
                    let week = moment().day(-7).format('YYYY-MM-DD');
                    return f.date >= week
                })
            case 'Month':
                return filteredData.filter(f => {
                    let month = moment().day(-30).format('YYYY-MM-DD');
                    return f.date >= month
                })
            case 'Year':
                return filteredData.filter(f => {
                    let year = moment().day(-365).format('YYYY-MM-DD');
                    return f.date >= year
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
                y: array.filter(a => a.category === c.id)
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
        const filtered = {...this.state.filtered};
        let charts = <h1>NO DATA FOR DISPLAY</h1>; //<Redirect to ='/spendings' />;
        if(spendings){
            charts = <Fragment>
                <div className={classes.Filter}>
                    <Select
                        value={filtered.value} 
                        name={filtered.id} 
                        options={filtered.options}
                        changed={(e) => this.inputHandler(e.target.value)}
                    />
                </div>
                <div className={classes.Charts}>
                    <RadialChart 
                    data={this.RadialCategory(this.showData(spendings))} 
                    title={`[Last ${filtered.value} Spendings]`}
                    />
                    <XYPlot 
                        max={this.getMaxCat(this.showData(spendings))} 
                        data={this.sumByCategory(this.showData(spendings))}
                        chartLabelY={"[Categories]"}
                        chartLabelX={"[Values]"}
                        chartTitle={`[Last ${filtered.value} Spendings]`}
                    />
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
