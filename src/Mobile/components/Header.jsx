import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "./SearchMenu";

const Header = ({ text }) => {
  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  };
  return (
    <div className="px-4 flex flex-col lg:flex-row items-center gap-4 text-sm lg:px-12 shadow py-4 shadow-gray-400">
      <div className="flex lg:flex-row md:flex-row flex-col gap-2 justify-between w-full">
        <div className="flex items-center gap-3 ">
          <Link to={"/"} className="flex items-center gap-3">
            <FaHome />
            <Link to={"/"} className="font-bold">
              Beranda
            </Link>
          </Link>

          <FaChevronRight />
          <h1 className="font-bold ">{truncateText(text, 25)}</h1>
        </div>
        <div className="lg:w-72 shadow-sm">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
