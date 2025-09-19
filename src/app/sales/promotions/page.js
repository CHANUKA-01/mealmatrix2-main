"use client";

import React from "react";
import PromotionsList from "@/components/sales/promotions/PromotionsList";
import PromotionStats from "@/components/sales/promotions/PromotionStats";
import { PlusIcon, FilterIcon, DownloadIcon } from "lucide-react";

const Promotions = () => {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Promotions</h1>
          <p className="text-gray-500 mt-1">
            Manage and track your promotional campaigns
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
            <PlusIcon size={18} className="mr-1" />
            <span>Create Promotion</span>
          </button>
        </div>
      </div>

      <div className="mb-6">
        <PromotionStats />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">All Promotions</h2>
        <div className="mt-3 md:mt-0 flex space-x-3">
          <button className="px-3 py-2 border border-gray-300 rounded-md flex items-center text-gray-700 hover:bg-gray-50">
            <FilterIcon size={16} className="mr-1" />
            <span>Filter</span>
          </button>
          <button className="px-3 py-2 border border-green-500 rounded-md flex items-center text-white-700 hover:bg-green-50">
            <DownloadIcon size={16} className="mr-1" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <PromotionsList />
    </div>
  );
};

export default Promotions;
