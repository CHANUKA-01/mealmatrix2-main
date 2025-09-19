"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Happy Hour", views: 430, redemptions: 126 },
  { name: "Breakfast Bundle", views: 215, redemptions: 84 },
  { name: "Loyalty Special", views: 145, redemptions: 62 },
  { name: "Coffee & Pastry", views: 580, redemptions: 215 },
  { name: "Student Discount", views: 0, redemptions: 0 },
];

export default function PromotionStats() {
  return (
    <div className="bg-white p-5 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Promotion Performance
        </h2>
        <select className="text-sm border rounded-md px-3 py-1.5 bg-gray-50">
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="views" name="Views" fill="#89c77bff" />
            <Bar dataKey="redemptions" name="Redemptions" fill="#e29c62ff" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
