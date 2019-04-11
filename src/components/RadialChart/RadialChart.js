import React from 'react';
import {
  ChartLabel,
  RadialChart
} from 'react-vis';

const radialChart = (props) => {
  return (
    <div>
      <RadialChart
        className="ma1 center"
        data={props.data}
        margin={{bottom: 100}}
        showLabels={true}
        labelsRadiusMultiplier={0.95}
        width={450}
        height={450} 
      >
        <ChartLabel
        text={props.title}
        className="alt-chart-label"
        includeMargin={false}
        xPercent={0.3}
        yPercent={0.6}
        />
      </RadialChart>
    </div>
  )
};

export default radialChart;
