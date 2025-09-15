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
  pattern,
  children // childrenを受け取る
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
          // アイコン表示のため、デフォルトで左側に余白を追加
          className={`pl-12 ${className}`}
          placeholder={placeholder}
          required
          minLength={minlength}
          pattern={pattern}
        />
        {icon && (
          <span className="absolute left-4 top-3 text-gray-400 text-lg">
            {icon}
          </span>
        )}
        {/* InputField内にボタンなどを配置できるようにする */}
        {children}
      </div>
    </div>
  );
}
