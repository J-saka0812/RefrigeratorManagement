import React from "react";

export function InputField({
  type,
  id,
  name,
  className,
  placeholder,
  htmlFor,
  labelText,
  icon,
  value,
  onChange,
  minlength,
  pattern
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-gray-700 mb-2"
      >
        {labelText} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          value={value}
          onChange={onChange}
          type={type}
          id={id}
          name={name}
          className={className}
          placeholder={placeholder}
          required
          minlength={minlength}
          pattern={pattern}
        />
        {icon && (
          <span className="absolute left-4 top-3.5 text-gray-400 text-lg">
            {icon}
          </span>
        )}
      </div>
    </div>
  );
}
