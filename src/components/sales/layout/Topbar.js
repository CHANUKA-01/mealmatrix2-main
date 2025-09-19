import React from 'react';
import { MenuIcon, SearchIcon, BellIcon, MessageSquareIcon } from 'lucide-react';

const Topbar = ({ toggleSidebar }) => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="px-4 py-3 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 focus:outline-none"
          >
            <MenuIcon size={20} />
          </button>
          <div className="ml-4 hidden md:block">
            <h1 className="text-lg font-semibold text-gray-800">
              Sales & Promotions Dashboard
            </h1>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-4">
          {/* Search box */}
          <div className="relative hidden md:block">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <SearchIcon size={18} />
            </div>
          </div>

          {/* Notification */}
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 relative">
            <BellIcon size={20} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Messages */}
          <button className="p-2 rounded-md text-gray-500 hover:bg-gray-100 relative">
            <MessageSquareIcon size={20} />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
