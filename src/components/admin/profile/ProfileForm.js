"use client";

import React from "react";
import { ChevronDownIcon } from "lucide-react";

export function ProfileForm({ user }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { label: "Full Name", value: user.fullName },
          { label: "Nick Name", value: user.nickName },
          { label: "Gender", value: user.gender },
          { label: "Country", value: user.country },
          { label: "Language", value: user.language },
          { label: "Time Zone", value: user.timezone },
        ].map((field) => (
          <div key={field.label}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>
            <div className="relative">
              <input
                type="text"
                value={field.value || ""}
                disabled
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-md text-gray-700"
              />
              <ChevronDownIcon
                size={20}
                className="absolute right-3 top-3 text-gray-400"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
