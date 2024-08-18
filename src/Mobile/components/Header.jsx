import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = ({text}) => {
  return (
    <div className="px-4 mt-4 flex  items-center gap-2 text-sm">
      <Link to={"/"} className="font-bold">
        Beranda
      </Link>
      <FaChevronRight />
      <h1 className="font-bold">{text}</h1>
    </div>
  );
};

export default Header;
