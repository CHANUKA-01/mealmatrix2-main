"use client";

import React, { useState, useEffect } from "react";

const dummyCustomers = [
  {
    id: 1,
    name: "Amila Perera",
    email: "amilaperera@sliit.lk",
    status: "Active",
    lastEngagement: "2025-08-12",
  },
  {
    id: 2,
    name: "Anjali Perera",
    email: "anjali.perera@student.sliit.lk",
    status: "Dormant",
    lastEngagement: "2025-06-10",
  },
  {
    id: 3,
    name: "Chathura Fernando",
    email: "chathura.fernando@sliit.lk",
    status: "New",
    lastEngagement: "2025-08-01",
  },
  {
    id: 4,
    name: "Sajith Kumar",
    email: "sajith.kumar@sliit.lk",
    status: "Active",
    lastEngagement: "2025-08-11",
  },
  {
    id: 5,
    name: "Malithi Jayawardena",
    email: "malithi.jayawardena@sliit.lk",
    status: "Active",
    lastEngagement: "2025-08-10",
  },
];

const dummyEngagementData = {
  1: [
    {
      promotion: "SLIIT Freshers' Week",
      clicks: 22,
      purchases: 5,
      lastActive: "2025-08-11",
    },
    {
      promotion: "Meal Matrix Campus Discount",
      clicks: 15,
      purchases: 8,
      lastActive: "2025-08-10",
    },
  ],
  2: [
    {
      promotion: "SLIIT Alumni Reunion",
      clicks: 1,
      purchases: 0,
      lastActive: "2025-05-30",
    },
  ],
  3: [
    {
      promotion: "Welcome Orientation Pack",
      clicks: 10,
      purchases: 3,
      lastActive: "2025-08-02",
    },
  ],
  4: [
    {
      promotion: "Campus Health Drive",
      clicks: 12,
      purchases: 2,
      lastActive: "2025-08-10",
    },
    {
      promotion: "SLIIT Career Fair",
      clicks: 8,
      purchases: 1,
      lastActive: "2025-08-09",
    },
  ],
  5: [
    {
      promotion: "Library Book Sale",
      clicks: 18,
      purchases: 4,
      lastActive: "2025-08-09",
    },
  ],
};

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomers(dummyCustomers);
  }, []);

  const filteredCustomers = customers.filter((customer) => {
    return (
      (filterStatus === "all" || customer.status.toLowerCase() === filterStatus) &&
      customer.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  // Close modal on background click
  const handleModalClose = (e) => {
    if (e.target.id === "modal-background") {
      setSelectedCustomer(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Customer Engagement</h1>
        <p className="text-gray-500 mt-1">
          View student and staff engagement with campus promotions and events
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
        <div className="bg-green-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-green-700">{customers.length}</p>
          <p className="text-sm text-green-700">Total Users</p>
        </div>
        <div className="bg-green-200 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-green-800">
            {customers.filter((c) => c.status === "Active").length}
          </p>
          <p className="text-sm text-green-800">Active</p>
        </div>
        <div className="bg-orange-100 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-orange-700">
            {customers.filter((c) => c.status === "New").length}
          </p>
          <p className="text-sm text-orange-700">New</p>
        </div>
        <div className="bg-orange-200 p-4 rounded-lg shadow text-center">
          <p className="text-lg font-semibold text-orange-800">
            {customers.filter((c) => c.status === "Dormant").length}
          </p>
          <p className="text-sm text-orange-800">Dormant</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="new">New</option>
          <option value="dormant">Dormant</option>
        </select>
      </div>

      {/* Customers List */}
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200 max-h-[500px] overflow-y-auto">
        {filteredCustomers.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">No users found.</p>
        ) : (
          filteredCustomers.map((customer) => (
            <div
              key={customer.id}
              className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{customer.name}</h3>
                <p className="text-sm text-gray-500">{customer.email}</p>
                <p className="text-xs text-gray-400">
                  Last Engagement: {new Date(customer.lastEngagement).toLocaleDateString()}
                </p>
              </div>
              <div className="text-sm">
                <span
                  className={`px-3 py-1 rounded-full font-medium ${
                    customer.status === "Active"
                      ? "bg-green-200 text-green-800"
                      : customer.status === "New"
                      ? "bg-orange-200 text-orange-800"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {customer.status}
                </span>
              </div>
              <div>
                <button
                  onClick={() => setSelectedCustomer(customer)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                >
                  View Engagement
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selectedCustomer && (
        <div
          id="modal-background"
          onClick={handleModalClose}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        >
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative">
            <button
              onClick={() => setSelectedCustomer(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              aria-label="Close modal"
            >
              &#x2715;
            </button>
            <h2 className="text-xl font-bold mb-4">
              Engagement for {selectedCustomer.name}
            </h2>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {(dummyEngagementData[selectedCustomer.id] || []).length === 0 ? (
                <p className="text-gray-500">No engagement data available.</p>
              ) : (
                <table className="w-full table-auto border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-green-100 text-green-800">
                      <th className="border border-gray-300 px-4 py-2 text-left">Promotion/Event</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Clicks</th>
                      <th className="border border-gray-300 px-4 py-2 text-center">Participations</th>
                      <th className="border border-gray-300 px-4 py-2 text-left">Last Active</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummyEngagementData[selectedCustomer.id].map((engagement, idx) => (
                      <tr key={idx} className="hover:bg-green-50">
                        <td className="border border-gray-300 px-4 py-2">{engagement.promotion}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{engagement.clicks}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">{engagement.purchases}</td>
                        <td className="border border-gray-300 px-4 py-2">{new Date(engagement.lastActive).toLocaleDateString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
