import React from 'react';
import { Tooltip, Pie, PieChart } from 'recharts';

class radialChart extends React.Component {
  render() {
    const {data} = this.props;
    const PieListChart = (
      <PieChart width={800} height={450}>
        <Pie  data={data} dataKey="angle" 
              nameKey="label" cx="50%" cy="50%" 
              outerRadius={200} fill="#82ca9d"  
              label={{ fill: 'black', fontSize: 20, angle:0}} />
        <Tooltip/>
      </PieChart>)
    return (
      <div>
        <h2>Spendings by category</h2>
        {PieListChart}
      </div>
    )
  }
};

export default radialChart;
