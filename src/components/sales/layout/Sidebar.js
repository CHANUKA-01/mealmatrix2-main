"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  TrendingUpIcon,
  TagIcon,
  UsersIcon,
  SettingsIcon,
  CoffeeIcon,
} from "lucide-react";

export default function Sidebar({ isOpen }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", path: "/sales/dashboard", icon: <HomeIcon size={20} /> },
    { name: "Promotions", path: "/sales/promotions", icon: <TagIcon size={20} /> },
    { name: "Sales", path: "/sales/sales", icon: <TrendingUpIcon size={20} /> },
    { name: "Customers", path: "/sales/customers", icon: <UsersIcon size={20} /> },
    { name: "Settings", path: "/sales/settings", icon: <SettingsIcon size={20} /> },
  ];

  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-white text-gray-500 transition-all duration-300 ease-in-out flex flex-col h-full`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center h-16 border-b border-transparent">
        <div
          className={`flex items-center ${
            isOpen ? "justify-start pl-4" : "justify-center"
          }`}
        >
          
          <Image 
            src="/logo.png"        
            alt="Meal Matrix Logo" 
            width={60}             
            height={60}/>

          {isOpen && (
            <span className="ml-2 text-xl font-semibold">
              <span className="text-green-500">Meal</span>{" "}
              <span className="text-orange-500">Matrix</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center px-4 py-3 mb-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-orange-100 text-gray"
                    : "text-gray hover:bg-orange-100"
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                {isOpen && <span className="ml-3">{item.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Info */}
      <div className="p-4 bg-green-50 border border-transparent">
        {isOpen ? (
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-transparent flex items-center justify-center">
            <Image 
              src="/avatar.png"        
              alt="Meal Matrix Logo" 
              width={60}             
              height={60}
              className="rounded-full object-cover"/>  
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">Sales Officer</p>
              <p className="text-xs text-orange-300">Nuwanaka Nadil</p>
            </div>
          </div>
        ) : (
          <div className="w-8 h-8 mx-auto rounded-full bg-transparent flex items-center justify-center">
            <Image 
              src="/avatar.png"        
              alt="Meal Matrix Logo" 
              width={60}             
              height={60}
              className="rounded-full object-cover"/>  
          </div>
        )}
      </div>
    </div>
  );
}
