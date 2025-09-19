"use client";

import React from "react";
import {
  TagIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";

const promotions = [
  {
    id: 1,
    title: "Happy Hour - 50% Off",
    status: "active",
    date: "May 10 - May 17",
    redemptions: 126,
  },
  {
    id: 2,
    title: "Breakfast Bundle",
    status: "active",
    date: "May 1 - May 31",
    redemptions: 84,
  },
  {
    id: 3,
    title: "Student Discount",
    status: "scheduled",
    date: "May 20 - Jun 20",
    redemptions: 0,
  },
  {
    id: 4,
    title: "Coffee & Pastry",
    status: "ended",
    date: "Apr 15 - May 5",
    redemptions: 215,
  },
];

export default function RecentPromotions() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Promotions
        </h2>
        <button className="text-green-600 text-sm font-medium hover:text-green-800">
          View All
        </button>
      </div>
      <div className="overflow-hidden">
        {promotions.map((promo) => (
          <div
            key={promo.id}
            className="px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50"
          >
            <div className="flex items-start">
              <div className="bg-green-100 p-2 rounded-lg mr-3">
                <TagIcon size={18} className="text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-medium text-gray-800">{promo.title}</h3>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      promo.status === "active"
                        ? "bg-green-100 text-green-800"
                        : promo.status === "scheduled"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {promo.status.charAt(0).toUpperCase() +
                      promo.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center mt-1 text-sm text-gray-500">
                  <ClockIcon size={14} className="mr-1" />
                  <span>{promo.date}</span>
                </div>
                <div className="mt-2 flex justify-between">
                  <span className="text-sm text-gray-500">
                    Redemptions: {promo.redemptions}
                  </span>
                  <div className="flex space-x-2">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <CheckCircleIcon size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-gray-600">
                      <XCircleIcon size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
