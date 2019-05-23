import React from 'react';
import { 
    XAxis,
    YAxis,
    BarChart,
    CartesianGrid,
    Tooltip,
    Bar
} from 'recharts';

class xyPlot extends React.Component {
    render() {
    const {data} = this.props;
    return (
        <div>
        <h2>All spendings by date range</h2>
        <BarChart width={1200} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="x" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#82ca9d" />
        </BarChart>
        </div>
  )
}}

export default xyPlot;
