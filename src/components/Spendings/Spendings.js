    import React, { Component } from 'react';
    import {  XYPlot,
        VerticalBarSeries,
        XAxis,
        YAxis,
        ChartLabel
    } from 'react-vis';

    class Spendings extends Component {

    getData = () => {
        const data = this.props.spendings.map((spending, i) => {
            return {
                x: i+1,
                y: spending.value
            }
        })
        return data;
    } 

    getValues = (data) => {
        const values = data.map(spending => {return spending.value})
        return values;
    }

    getCategories = () => {
        var categories = this.props.spendings.map(spending => {return spending.category}); 
        return [...new Set(categories)];
    }
    
    sumCat = (sum, number) => {
        return sum + parseInt(number.value)
    };

    sumByCategory = () => {
        const categories = this.getCategories(this.props.spendings);
        const values = categories.map(e => {
                return this.props.spendings.filter(x => x.category === e)
                .reduce(this.sumCat,0)
            })
        return values;
    }

    getMin = () => {
        return Math.min(...this.getValues())
    }

    getMax = () => {
        console.log(this.sumByCategory())
        return Math.max(...this.getValues(this.props.spendings))
    }

    render() {
        return (
            <div className="ma2 pa3">
                <XYPlot 
                    className="ma2 pa3 center"
                    height={400}
                    width={400}
                    yDomain={[0,this.getMax()]}
                    xDomain={[0,this.props.spendings.length]}
                    color="white"
                    stroke="black"
                    labelAnchorX='middle-alignment'
                >
                    <VerticalBarSeries data={this.getData()} height={300}/>
                    <XAxis/>
                    <YAxis/>
                
                <ChartLabel
                    text="Values"
                    className="alt-x-label"
                    includeMargin={true}
                    xPercent={0.5}
                    yPercent={0.95}
                />
                </XYPlot>
            </div>
        );
    }}

export default Spendings;