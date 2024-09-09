import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import SideBar from "./SideBar";
import { useLocation } from "react-router-dom";
import useAuth from "../../Utils/Zustand/useAuth";
import icon from "../../assets/icon.png";
const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { user } = useAuth();
  const username = user?.username;
  const token = user?.token;
  const role = user?.role; // Tidak menetapkan default "user" di sini

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const location = useLocation();

  return (
    <>
      <div className="bg-hijau px-4 py-4 text-white font-bold flex justify-between items-center lg:px-12">
        <div className="flex items-center gap-1">
          <div>
            <img src={icon} alt="" srcset="" className="w-16"/>
          </div>
          <div className="flex flex-col">
            <p>SIASKA</p>
            <span className="text-xs">Sistem Informasi  Aset SMKN 2 KETAPANG</span>
          </div>
        </div>
        {!location.pathname.startsWith("/detail") && role !== undefined && (
          <button onClick={toggleSidebar} className="text-white">
            {isSidebarOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        )}
      </div>
      <AnimatePresence>
        {isSidebarOpen && role !== undefined && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-40"
              onClick={toggleSidebar}
            ></div>
            <SideBar role={role} user={username} token={token} />
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
