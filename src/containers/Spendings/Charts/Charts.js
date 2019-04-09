import React, { Component, Fragment } from 'react';
import XYPlot from '../../../components/XYPlot/XYPlot';
import RadialChart from '../../../components/RadialChart/RadialChart';
import classes from './Charts.css';
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';

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

    render() {
        const {spendings} = this.props;
        let charts = <Redirect to ='/spendings' />;
        if(spendings){
            charts = <Fragment>
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
            </Fragment>
        }
        return (
            <div className={classes.Charts}>
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
