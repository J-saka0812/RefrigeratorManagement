import React from "react";

export function MessageField({id, className, icon, children}) {
  return (
    <div id={id} className={className}>
      <div className="flex items-center">
        <span className="mr-2">{icon}</span>
        <span>
          {children}
        </span>
      </div>
    </div>
  );
}
