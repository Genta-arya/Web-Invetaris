import React from "react";

const CustomDatePicker = ({ value, onChange }) => {
  return (
    <div className="relative">
      <input
        type="date"
        value={value}
        onChange={onChange}
        className="w-40 px-3 text-xs py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau focus:border-hijau sm:text-sm"
      />
    </div>
  );
};

export default CustomDatePicker;
