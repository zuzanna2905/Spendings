import React, { Component } from 'react';
import XYPlot from '../../components/XYPlot/XYPlot';
import RadialChart from '../../components/RadialChart/RadialChart';
import classes from './Charts.css';

class Charts extends Component {
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

    getCategories = (array) => {
        var categories = array.map(a => {return a.category});
        return [...new Set(categories)];
    }
    
    sumCat = (sum, number) => {
        return sum + parseInt(number.value)
    };

    sumByCategory = (array) => {
        const categories = this.getCategories(array);
        const values = categories.map((e,i) => {
                return {
                x: e,
                y: array.filter(a => a.category === e)
                .reduce(this.sumCat,0)
            }})
        return values;
    }

    RadialCategory = (array) => {
        const categories = this.getCategories(array);
        const values = categories.map((e,i) => {
                return {
                label: e,
                angle: array.filter(a => a.category === e)
                .reduce(this.sumCat,0)
            }})
        return values;
    }

    //suma kilku kategorii
    //pokaż dane dla kategorii
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
        const categories = this.getCategories(array);
        return Math.max(...categories.map((e) => {
                return array.filter(a => a.category === e)
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

    render() {
        const {spendings} = this.props;
        return (
            <div className={classes.Charts}>
                <RadialChart 
                    data={this.RadialCategory(spendings)} 
                    title={"[Last Month Spendings]"}
                />
                <XYPlot 
                    max={this.getMaxCat(spendings)} 
                    data={this.sumByCategory(spendings)}
                    chartLabelY={"[Categories]"}
                    chartLabelX={"[Values]"}
                    chartTitle={"Last Month Spendings"}
                />
            </div>
        );
    }}

export default Charts;