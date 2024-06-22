"use client";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const MonthlyExpenseLineChart = ({
  data,
  height,
  width,
}: {
  width: string | number;
  height: string | number;
  data: { name: string; value: number }[];
}) => {
  return (
    <div className="p-2">
      <h2 className="pb-2 text-3xl font-semibold tracking-tight first:mt-0">Gross Monthly Expense</h2>
      <ResponsiveContainer width={width} height={height}>
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#82ca9d" name="Value" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
