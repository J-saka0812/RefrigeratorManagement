import React from "react";

export function FunctionButton({ className, onClick, children }) {
  return (
    <div>
      <button onclick={onClick} className={className}>
        {children}
      </button>
    </div>
  );
}

// deleteButton用css
("bg-gradient-to-r from-red-400 to-pink-500 hover:from-red-500 hover:to-pink-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5");

//editButton用css
 onclick="editFood('carrot')"
        className="bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-500 hover:to-cyan-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"