"use client";

import React from "react";
import { ClockIcon, CheckIcon, XIcon, EditIcon } from "lucide-react";

const approvals = [
  {
    id: 1,
    title: "Summer Special Promotion",
    requester: "Emma Johnson",
    type: "Promotion",
    date: "May 12, 2023",
  },
  {
    id: 2,
    title: "Price Adjustment - Beverages",
    requester: "Michael Chen",
    type: "Price Change",
    date: "May 11, 2023",
  },
  {
    id: 3,
    title: "New Loyalty Program Rules",
    requester: "Sarah Williams",
    type: "Program",
    date: "May 10, 2023",
  },
];

export default function PendingApprovals() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-5 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          Pending Approvals
        </h2>
      </div>
      <div className="overflow-hidden">
        {approvals.length > 0 ? (
          approvals.map((item) => (
            <div
              key={item.id}
              className="px-5 py-4 border-b border-gray-100 last:border-0 hover:bg-gray-50"
            >
              <div className="flex justify-between">
                <div>
                  <h3 className="font-medium text-gray-800">{item.title}</h3>
                  <div className="flex items-center mt-1 text-sm text-gray-500">
                    <span>By {item.requester}</span>
                    <span className="mx-2">•</span>
                    <span>{item.type}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center text-sm text-gray-500">
                    <ClockIcon size={14} className="mr-1" />
                    <span>{item.date}</span>
                  </div>
                  <div className="mt-2 flex space-x-2">
                    <button className="p-1.5 bg-green-500 text-white rounded-full hover:bg-green-600">
                      <EditIcon size={14} />
                    </button>
                    <button className="p-1.5 bg-red-500 text-white rounded-full hover:bg-red-600">
                      <XIcon size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="px-5 py-8 text-center text-gray-500">
            No pending approvals at this time.
          </div>
        )}
      </div>
    </div>
  );
}
