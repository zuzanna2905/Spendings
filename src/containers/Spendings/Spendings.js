    import React, { Component } from 'react';
    import {  XYPlot,
        VerticalBarSeries,
        XAxis,
        YAxis,
        ChartLabel,
        RadialChart
    } from 'react-vis';
    import classes from './Spendings.css'

    class Spendings extends Component {

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

    //select
    //<label>Category:</label>
    // <select className="ma2 ph3">
    // {this.selection(this.getCategories(spendings))}
    // </select>

    render() {
        const {spendings} = this.props;
        return (
            <div className={classes.Spendings}>
                <XYPlot 
                    xType="ordinal"
                    margin={{bottom: 80, left: 80}}
                    className="ma1 center"
                    height={500}
                    width={400}
                    yDomain={[0,this.getMaxCat(spendings) + 50]}
                    color="white"
                    stroke="black"
                    >

                    <VerticalBarSeries data={this.sumByCategory(spendings)}/>
                    <XAxis tickLabelAngle={-35}/>
                    <YAxis/>
                    <ChartLabel
                        text="[Categories]"
                        className="alt-x-label"
                        includeMargin={false}
                        xPercent={0.3}
                        yPercent={1.20}
                    />
                    <ChartLabel
                        text="[Values]"
                        className="alt-y-label"
                        includeMargin={false}
                        xPercent={-0.16}
                        yPercent={0.06}
                        style={{
                            transform: 'rotate(-90)',
                            textAnchor: 'end'
                        }}
                    />                    
                    <ChartLabel
                        text="Last Month Spendings"
                        className="alt-chart-label"
                        includeMargin={false}
                        xPercent={0.3}
                        yPercent={0.05}
                    />
                </XYPlot>
                <RadialChart
                    className="ma1 center"
                    data={this.RadialCategory(spendings)}
                    margin={{bottom: 100}}
                    showLabels={true}
                    labelsRadiusMultiplier={0.95}
                    width={400}
                    height={500} 
                >
                    <ChartLabel
                    text="[Last Month Spendings]"
                    className="alt-chart-label"
                    includeMargin={false}
                    xPercent={0.3}
                    yPercent={0.6}
                    />
                </RadialChart>
            </div>
        );
    }}

export default Spendings;