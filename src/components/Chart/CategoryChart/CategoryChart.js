import React from 'react';
import { LineChart, Line, CartesianGrid, YAxis, Tooltip } from 'recharts';

class categoryChart extends React.Component {
  render() {
  const {data} = this.props;
  const renderLineChart = (
    <LineChart width={800} height={400} data={data}>
      <Line type="monotone" dataKey="angle" nameKey='label' stroke="#8884d8" />
      <CartesianGrid stroke="#ccc" />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
  return (
    <div>
      {renderLineChart}
    </div>
  )
}};

export default categoryChart;
