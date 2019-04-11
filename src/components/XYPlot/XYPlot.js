import React from 'react';
import {  XYPlot,
    VerticalBarSeries,
    XAxis,
    YAxis,
    ChartLabel
} from 'react-vis';

const xyPlot = (props) => {
    return (
    <XYPlot 
        xType="ordinal"
        margin={{bottom: 80, left: 80}}
        className="ma1 center"
        height={500}
        width={550}
        yDomain={[0,props.max + 50]}
        color="white"
        stroke="black"
    >

        <VerticalBarSeries data={props.data}/>
        <XAxis tickLabelAngle={-45}/>
        <YAxis/>
        <ChartLabel
            text={props.chartLabelY}
            className="alt-x-label"
            includeMargin={false}
            xPercent={0.3}
            yPercent={1.20}
        />
        <ChartLabel
            text={props.chartLabelX}
            className="alt-y-label"
            includeMargin={false}
            xPercent={-0.12}
            yPercent={0.06}
            style={{
                transform: 'rotate(-90)',
                textAnchor: 'end'
            }}
        />                    
        <ChartLabel
            text={props.chartTitle}
            className="alt-chart-label"
            includeMargin={false}
            xPercent={0.3}
            yPercent={0.05}
        />
    </XYPlot>
  )
}

export default xyPlot;
