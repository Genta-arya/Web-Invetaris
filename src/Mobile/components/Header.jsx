import React from "react";
import { FaChevronRight, FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({ text }) => {
  return (
    <div className="px-4 mt-4 flex  items-center gap-2 text-sm lg:px-12">
      <div className="flex items-center gap-3">
        <FaHome />

        <Link to={"/"} className="font-bold">
          Beranda
        </Link>
      </div>
      <FaChevronRight />
      <h1 className="font-bold">{text}</h1>
    </div>
  );
};

export default Header;
