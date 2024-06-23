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

export const GenericLineChart = ({
  data,
  height,
  width,
  title,
  description,
}: {
  description?: string;
  title: string;
  width: string | number;
  height: string | number;
  data: { name: string; value: number }[];
}) => {
  return (
    <div className="p-2">
      <div className="pb-4">
        <h2 className="text-3xl font-semibold tracking-tight first:mt-0">
          {title}
        </h2>
        {description && <p className="text-slate-400">{description}</p>}
      </div>
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
