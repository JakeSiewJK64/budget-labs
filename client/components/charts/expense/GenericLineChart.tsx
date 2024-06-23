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
import { CurveType } from "recharts/types/shape/Curve";

export const GenericLineChart = ({
  data,
  height,
  width,
  dataLines,
  title,
  description,
}: {
  description?: string;
  title: string;
  width: string | number;
  height: string | number;
  data: { name: string; value: number }[];
  dataLines: {
    type?: CurveType;
    dataKey: string;
    color?: string;
    label?: string;
  }[];
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
          {dataLines.map((dataLine) => (
            <Line
              type={dataLine.type ?? "monotone"}
              dataKey={dataLine.dataKey}
              stroke={dataLine.color ?? "#82ca9d"}
              name={dataLine.label ?? "Value"}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
