"use client";
import Image from "next/image";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const lastWeekOrderData = [
  { name: "Main Canteen", orders: 30 },
  { name: "Science Block", orders: 20 },
  { name: "Tech Cafe", orders: 15 },
  { name: "Business Hub", orders: 10 },
  { name: "Arts Corner", orders: 12 },
  { name: "Library Cafe", orders: 18 },
  { name: "East Wing", orders: 22 },
  { name: "West Wing", orders: 16 },
  { name: "South Plaza", orders: 20 },
  { name: "North Hall", orders: 14 },
  { name: "Cafeteria East", orders: 11 },
  { name: "Garden View", orders: 19 },
  { name: "Student Lounge", orders: 17 },
  { name: "Sports Cafe", orders: 13 },
  { name: "Tech Park", orders: 25 },
];

const totalLastWeekOrders = lastWeekOrderData.reduce(
  (acc, item) => acc + item.orders,
  0
);
const topCanteen = lastWeekOrderData.reduce((prev, current) =>
  prev.orders > current.orders ? prev : current
).name;
const topOrders = lastWeekOrderData.reduce((prev, current) =>
  prev.orders > current.orders ? prev : current
).orders;

// Custom XAxis Tick component for multiline labels
const CustomizedAxisTick = ({ x, y, payload }) => {
  const words = payload.value.split(" ");
  return (
    <g transform={`translate(${x},${y + 10})`}>
      {words.length > 1 ? (
        <>
          <text
            x={0}
            y={0}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize={12}
            fontWeight="500"
          >
            {words[0]}
          </text>
          <text
            x={0}
            y={14}
            textAnchor="middle"
            fill="#d1d5db"
            fontSize={12}
            fontWeight="500"
          >
            {words.slice(1).join(" ")}
          </text>
        </>
      ) : (
        <text
          x={0}
          y={0}
          textAnchor="middle"
          fill="#d1d5db"
          fontSize={12}
          fontWeight="500"
        >
          {payload.value}
        </text>
      )}
    </g>
  );
};

const OrdersChart = () => {
  // Width for chart based on data length
  const chartWidth = lastWeekOrderData.length * 60;

  return (
    <div className="bg-white rounded-lg p-4 h-full" style={{ width: "98%" }}>
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg font-semibold">Last Week Orders of Canteens</h1>
        <Image src="/moreDark.png" alt="" width={20} height={20} />
      </div>

      {/* Scroll container */}
      <div className="overflow-x-auto w-full" style={{ maxWidth: "100%" }}>
        <div style={{ width: chartWidth, height: 300 }}>
          <AreaChart
            width={chartWidth}
            height={300}
            data={lastWeekOrderData}
            margin={{ bottom: 40, left: 20, right: 20 }} // Increased bottom margin for multiline labels
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              interval={0}
              tick={<CustomizedAxisTick />}
            />
            <YAxis
              axisLine={false}
              tick={{ fill: "#d1d5db" }}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }} />
            <Legend
              align="left"
              verticalAlign="top"
              wrapperStyle={{ paddingTop: "20px", paddingBottom: "40px" }}
            />
            <Area
              type="monotone"
              dataKey="orders"
              stroke="#34D399"
              fill="#BBF7D0"
              fillOpacity={0.7}
              strokeWidth={3}
            />
          </AreaChart>
        </div>
      </div>

      <div className="flex justify-center gap-16 mt-4">
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-emerald-400 rounded-full" />
          <h1 className="font-bold">{totalLastWeekOrders}</h1>
          <h2 className="text-xs text-gray-300">Total Last Week Orders</h2>
        </div>
        <div className="flex flex-col gap-1 items-center">
          <div className="w-5 h-5 bg-gray-400 rounded-full" />
          <h1 className="font-bold">{topOrders}</h1>
          <h2 className="text-xs text-gray-300">Top: {topCanteen}</h2>
        </div>
      </div>
    </div>
  );
};

export default OrdersChart;
