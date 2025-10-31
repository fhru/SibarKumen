"use client";
import { useState } from 'react';
import { clsx } from 'clsx';
import Sidebar from '@/components/dashboard/Sidebar';
import Header from '@/components/dashboard/Header';

export default function DashboardProvider({ children, user }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar 
        user={user}
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        isCollapsed={isCollapsed}
        toggleCollapse={toggleCollapse}
      />

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Main Content */}
      <div className={clsx('flex flex-col flex-1 transition-all duration-300 ease-in-out', {
        'md:ml-64': !isCollapsed,
        'md:ml-20': isCollapsed,
      })}>
        <Header user={user} toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} toggleCollapse={toggleCollapse} />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
