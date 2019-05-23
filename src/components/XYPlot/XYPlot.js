import React from 'react';
import { 
    XAxis,
    YAxis,
    BarChart,
    CartesianGrid,
    Tooltip,
    Legend,
    Bar
} from 'recharts';

class xyPlot extends React.Component {
    render() {
    const {data} = this.props;
    return (
        <BarChart width={1200} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="y" fill="#8884d8" />
      </BarChart>
  )
}}

export default xyPlot;
