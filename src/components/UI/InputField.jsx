import React from "react";

// Reusable input field component
const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block mb-1">{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      className="input input-bordered w-full"
    />
  </div>
);

export default InputField;
