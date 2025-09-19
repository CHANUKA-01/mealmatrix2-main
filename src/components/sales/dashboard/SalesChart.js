"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "Mon", sales: 4000, customers: 240 },
  { date: "Tue", sales: 3000, customers: 198 },
  { date: "Wed", sales: 2000, customers: 120 },
  { date: "Thu", sales: 2780, customers: 160 },
  { date: "Fri", sales: 1890, customers: 110 },
  { date: "Sat", sales: 2390, customers: 145 },
  { date: "Sun", sales: 3490, customers: 210 },
];

export default function SalesChart({ title }) {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <select className="text-sm border rounded-md px-3 py-1.5 bg-gray-50">
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="sales"
              stroke="#3B82F6"
              strokeWidth={2}
              activeDot={{ r: 6 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="customers"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
