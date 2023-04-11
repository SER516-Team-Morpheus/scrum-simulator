import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Week 1', tasksRemaining: 10 },
  { name: 'Week 2', tasksRemaining: 8 },
  { name: 'Week 3', tasksRemaining: 6 },
  { name: 'Week 4', tasksRemaining: 4 },
  { name: 'Week 5', tasksRemaining: 2 },
  { name: 'Week 6', tasksRemaining: 0 },
];

const SpringBurndownChart = () => {
  return (
    <LineChart width={500} height={300} data={data}>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="tasksRemaining" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default SpringBurndownChart;
