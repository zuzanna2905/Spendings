import React from 'react';
import { Tooltip, Pie, PieChart } from 'recharts';

class radialChart extends React.Component {
  render() {
    const {data} = this.props;
  const PieListChart = (<PieChart width={730} height={350}>
    <Pie data={data} dataKey="angle" nameKey="label" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label innerRadius={60} />
    <Tooltip/>
  </PieChart>)
  return (
    <div>
      {PieListChart}
    </div>
  )
}};

export default radialChart;
