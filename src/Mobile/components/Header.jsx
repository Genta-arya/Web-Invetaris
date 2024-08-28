import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchBar from "./SearchMenu";

const Header = ({ text }) => {
  return (
    <div className="px-4 flex flex-col lg:flex-row items-center gap-4 text-sm lg:px-12 shadow py-4 shadow-gray-400">
      <div className="flex lg:flex-row md:flex-row flex-col gap-2 justify-between w-full">
        <div className="flex items-center gap-3 ">
          <FaHome />
          <Link to={"/"} className="font-bold">
            Beranda
          </Link>
          <FaChevronRight />
          <h1 className="font-bold">{text}</h1>
        </div>
        <div className="lg:w-72 shadow-sm">
          <SearchBar />
        </div>
      </div>
    </div>
  );
};

export default Header;
