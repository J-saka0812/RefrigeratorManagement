import React, { useEffect, useState } from "react";

export function ToggleButton({ onClick, viewState }) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);


  useEffect(() => {
    setIsPasswordVisible(viewState);
  }, [viewState]);

  return (
    <div>
      <button
        type="button"
        onClick={onClick}
        className="absolute right-4 top-4 text-gray-400"
      >
        {isPasswordVisible ? "🙈" : "👁️"}
      </button>
    </div>
  );
}
