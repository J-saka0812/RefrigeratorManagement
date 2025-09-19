import React from "react";

export function FunctionButton({ className, onClick, children, type }) {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
}
