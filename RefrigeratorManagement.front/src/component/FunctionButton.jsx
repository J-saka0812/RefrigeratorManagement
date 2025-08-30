import React from "react";

export function FunctionButton({ className, onClick, children }) {
  return (
    <div>
      <button onClick={onClick} className={className}>
        {children}
      </button>
    </div>
  );
}
