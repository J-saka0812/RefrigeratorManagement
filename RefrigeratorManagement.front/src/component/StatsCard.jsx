import React from 'react';
import "./styles/StatsCard.module.css"

export function StatsCard({ className, label, value, icon }) {
  return (
    <div className={`bg-white p-4 rounded-lg shadow ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{label}</p>
          <p className="value-text">{value}</p>
        </div>
        <div className="icon-container">
          <span className="text-2xl">{icon}</span>
        </div>
      </div>
    </div>
  );
}