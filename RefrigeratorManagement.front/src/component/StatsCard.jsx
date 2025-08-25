import React from 'react';

export function StatsCard({ className, label, value, icon }) {
  return (
    // Apply the main class ('total', 'expired') to the root element
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          {/* Add a specific class for the value */}
          <p className="value-text">{value}</p>
        </div>
        {/* Add a specific class for the icon container */}
        <div className="icon-container">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
};