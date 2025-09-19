"use client";

import React, { useState, useEffect } from "react";

const dummyReports = [
  {
    id: 1,
    name: "Monthly Sales - July 2025",
    date: "2025-07-31",
    type: "PDF",
    status: "Completed",
    description: "Summary of sales performance for July 2025",
    downloadUrl: "/reports/monthly-sales-july-2025.pdf",
  },
  {
    id: 2,
    name: "Weekly Product Performance - Week 30",
    date: "2025-07-23",
    type: "Excel",
    status: "Completed",
    description: "Top products and sales trends for week 30",
    downloadUrl: "/reports/weekly-product-performance-w30.xlsx",
  },
  // Add more sample reports here...
];

const SalesReports = () => {
  const [reports, setReports] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Simulate fetching from API or database
    setReports(dummyReports);
  }, []);

  // Filter and search reports
  const filteredReports = reports.filter((r) => {
    return (
      (filterType === "all" || r.type.toLowerCase() === filterType) &&
      r.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Sales Reports</h1>
        <p className="text-gray-500 mt-1">Download and manage your sales reports</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <input
          type="text"
          placeholder="Search reports..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="px-4 py-2 border rounded-md w-full sm:w-1/3 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="all">All Types</option>
          <option value="pdf">PDF</option>
          <option value="excel">Excel</option>
          <option value="csv">CSV</option>
        </select>
      </div>

      {/* Reports List */}
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        {filteredReports.length === 0 && (
          <p className="p-6 text-gray-500 text-center">No reports found.</p>
        )}

        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-800">{report.name}</h3>
              <p className="text-sm text-gray-500">{report.description}</p>
              <p className="text-xs text-gray-400 mt-1">
                Created on: {new Date(report.date).toLocaleDateString()}
              </p>
              <p className="text-xs text-gray-400">Type: {report.type.toUpperCase()}</p>
              <p className="text-xs text-gray-400">Status: {report.status}</p>
            </div>

            <div className="flex space-x-3">
              <a
                href={report.downloadUrl}
                download
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
              >
                Download
              </a>
              {/* Optionally add preview or delete buttons here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesReports;
