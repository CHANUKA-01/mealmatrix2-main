"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

export function ProfileCard({ user, setUser }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(user);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/updateUser", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // send cookies
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Update failed");
      const updated = await res.json();

      setUser(updated); // update parent state with new values
      setIsOpen(false);
    } catch (err) {
      console.error("Error updating user:", err);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img
              src="/profile2.png"
              alt={user.fullName}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-semibold text-lg text-gray-800">
              {user.fullName}
            </h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
        <button
          onClick={() => {
            setFormData(user);
            setIsOpen(true);
          }}
          className="bg-orange-500 text-white px-5 py-2 rounded-md font-medium text-sm hover:bg-orange-600 transition"
        >
          Edit
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X size={20} />
            </button>

            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Edit Profile
            </h2>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {[
                { name: "fullName", label: "Full Name" },
                { name: "nickName", label: "Nick Name" },
                { name: "gender", label: "Gender" },
                { name: "country", label: "Country" },
                { name: "language", label: "Language" },
                { name: "timezone", label: "Time Zone" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={formData[field.name] || ""}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-400"
                  />
                </div>
              ))}

              <div className="md:col-span-2 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
