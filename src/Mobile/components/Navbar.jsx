import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";
import useAuth from "../../Utils/Zustand/useAuth";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();

  const role = user?.role || "user";

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const location = useLocation();

  return (
    <>
      <div className="bg-hijau px-4 py-4 text-white font-bold flex justify-between items-center lg:px-12">
        <div className="flex flex-col">
          <p>SI-ASKA</p>
          <span className="text-xs">SMKN 2 KETAPANG</span>
        </div>
        {!location.pathname.startsWith("/detail") && (
          <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={toggleSidebar}
            ></div>
            <SideBar role={role} user={user} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
