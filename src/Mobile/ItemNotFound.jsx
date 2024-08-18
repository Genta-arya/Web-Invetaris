import React from "react";

const ItemNotFound = ({ text }) => {
  return (
    <div className="flex justify-center items-center mt-8">
      <p className="text-sm font-bold text-gray-700">{text}</p>
    </div>
  );
};

export default ItemNotFound;
