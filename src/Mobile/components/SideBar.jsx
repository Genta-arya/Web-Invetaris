import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FaHome,
  FaBoxOpen,
  FaUsers,
  FaCogs,
  FaArrowRight,
  FaCircle,
  FaStoreAlt,
  FaClipboardList,
  FaSignOutAlt,
  FaBookOpen,
  FaWarehouse,
  FaCamera,
  FaClipboardCheck,
  FaPrint,
} from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaBox,
  FaBoxArchive,
  FaCartFlatbed,
  FaClipboard,
  FaClipboardQuestion,
  FaSignHanging,
} from "react-icons/fa6";
import handleError from "../../Utils/HandleError";
import { Logout } from "../../Service/API/Authentikasi/Service_Authentikasi";
import Profil from "./Profil";

const sidebarVariants = {
  hidden: { x: "-100%" },
  visible: { x: 0 },
};

const submenuVariants = {
  hidden: { opacity: 0, height: 0 },
  visible: { opacity: 1, height: "auto" },
};

const SideBar = ({ role, user, token }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSubMenuOpen1, setIsSubMenuOpen1] = useState(false);
  const [isSubMenuOpen2, setIsSubMenuOpen2] = useState(false);
  const [isSubMenuOpen3, setIsSubMenuOpen3] = useState(false);
  const [isSubMenuOpen4, setIsSubMenuOpen4] = useState(false);
  const [isSubMenuOpen5, setIsSubMenuOpen5] = useState(false);
  const location = useLocation();

  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
  const toggleSubMenu1 = () => setIsSubMenuOpen1(!isSubMenuOpen1);
  const toggleSubMenu2 = () => setIsSubMenuOpen2(!isSubMenuOpen2);
  const toggleSubMenu3 = () => setIsSubMenuOpen3(!isSubMenuOpen3);
  const toggleSubMenu4 = () => setIsSubMenuOpen4(!isSubMenuOpen4);
  const toggleSubMenu5 = () => setIsSubMenuOpen5(!isSubMenuOpen5);
  const handleLogout = async () => {
    try {
      await Logout(token);
      localStorage.removeItem("token");
      window.location.reload();
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <motion.div
      className="w-64 bg-hijau h-full sidebar-scrollable  fixed top-0 left-0 z-50 text-white shadow-lg  pb-12"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={sidebarVariants}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Profil />
      <ul className="mt-4 space-y-1 text-sm">
        <Link
          to={"/"}
          className={`flex items-center p-4 transition-colors cursor-pointer ${
            location.pathname === "/" ? "border-t border-b" : "hover:opacity-80"
          }`}
        >
          <FaHome className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <li
          className={`flex flex-col ${
            location.pathname.startsWith("/inventory")
              ? "border-t border-b"
              : ""
          }`}
        >
          <div
            className="flex items-center p-4 cursor-pointer transition-colors hover:opacity-80"
            onClick={toggleSubMenu}
          >
            <FaWarehouse className="mr-3" />
            <span>Inventaris</span>
            <FaArrowRight
              className={`ml-auto transition-transform ${
                isSubMenuOpen ? "rotate-90" : ""
              }`}
            />
          </div>
          <motion.ul
            className="pl-6 space-y-0"
            initial="hidden"
            animate={isSubMenuOpen ? "visible" : "hidden"}
            variants={submenuVariants}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link
                to={"/inventory"}
                className={`${
                  isSubMenuOpen ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/inventory"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaClipboardList className="mr-3" />
                <span>Inventaris Barang</span>
              </Link>
            </li>
          </motion.ul>
        </li>

        <li
          className={`flex flex-col ${
            location.pathname.startsWith("/stok") ? "border-t border-b" : ""
          }`}
        >
          <div
            className="flex items-center p-4 cursor-pointer transition-colors hover:opacity-80"
            onClick={toggleSubMenu1}
          >
            <FaBoxOpen className="mr-3" />
            <span>Kelola Barang</span>
            <FaArrowRight
              className={`ml-auto transition-transform ${
                isSubMenuOpen1 ? "rotate-90" : ""
              }`}
            />
          </div>
          <motion.ul
            className="pl-6 space-y-0"
            initial="hidden"
            animate={isSubMenuOpen1 ? "visible" : "hidden"}
            variants={submenuVariants}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link
                to={"/inventory/daftar-barang"}
                className={`${
                  isSubMenuOpen1 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/inventory/daftar-barnag"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaBoxOpen className="mr-3" />
                <span>Daftar Barang</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/inventory/barang-masuk"}
                className={`${
                  isSubMenuOpen1 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/inventory/barang-masuk"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Barang Masuk</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/inventory/barang-keluar"}
                className={`${
                  isSubMenuOpen1 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/inventory/barang-keluar"
                    ? "border-t border-b"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignHanging className="mr-3" />
                <span>Barang Keluar</span>
              </Link>
            </li>
          </motion.ul>
        </li>
        <li
          className={`flex flex-col ${
            location.pathname.startsWith("/permintaan")
              ? "border-t border-b"
              : ""
          }`}
        >
          <div
            className="flex items-center p-4 cursor-pointer transition-colors hover:opacity-80"
            onClick={toggleSubMenu2}
          >
            <FaClipboardList className="mr-3" />
            <span>Kelola Permintaan</span>
            <FaArrowRight
              className={`ml-auto transition-transform ${
                isSubMenuOpen2 ? "rotate-90" : ""
              }`}
            />
          </div>
          <motion.ul
            className="pl-6 space-y-0"
            initial="hidden"
            animate={isSubMenuOpen2 ? "visible" : "hidden"}
            variants={submenuVariants}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link
                to={"/permintaan"}
                className={`${
                  isSubMenuOpen2 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/permintaan"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Daftar Permintaan</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/pengajuan/permintaan"}
                className={`${
                  isSubMenuOpen2 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/pengajuan/permintaan"
                    ? "border-t border-b"
                    : "hover:opacity-80"
                }`}
              >
                <FaCartFlatbed className="mr-3" />
                <span>Ajukan Permintaan</span>
              </Link>
            </li>
          </motion.ul>
        </li>

        <li
          className={`flex flex-col ${
            location.pathname.startsWith("/usulan") ? "border-t border-b" : ""
          }`}
        >
          <div
            className="flex items-center p-4 cursor-pointer transition-colors hover:opacity-80"
            onClick={toggleSubMenu3}
          >
            <FaClipboardList className="mr-3" />
            <span>Kelola Usulan</span>
            <FaArrowRight
              className={`ml-auto transition-transform ${
                isSubMenuOpen3 ? "rotate-90" : ""
              }`}
            />
          </div>
          <motion.ul
            className="pl-6 space-y-0"
            initial="hidden"
            animate={isSubMenuOpen3 ? "visible" : "hidden"}
            variants={submenuVariants}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link
                to={"/usulan"}
                className={`${
                  isSubMenuOpen3 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/usulan"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Daftar Usulan</span>
              </Link>
            </li>
          </motion.ul>
        </li>

        <li
          className={`flex flex-col ${
            location.pathname.startsWith("/peminjaman")
              ? "border-t border-b"
              : ""
          }`}
        >
          <div
            className="flex items-center p-4 cursor-pointer transition-colors hover:opacity-80"
            onClick={toggleSubMenu4}
          >
            <FaClipboardList className="mr-3" />
            <span>Kelola Peminjaman</span>
            <FaArrowRight
              className={`ml-auto transition-transform ${
                isSubMenuOpen4 ? "rotate-90" : ""
              }`}
            />
          </div>
          <motion.ul
            className="pl-6 space-y-0"
            initial="hidden"
            animate={isSubMenuOpen4 ? "visible" : "hidden"}
            variants={submenuVariants}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link
                to={"/peminjaman"}
                className={`${
                  isSubMenuOpen4 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/peminjaman"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Daftar Peminjaman</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/pengajuan/peminjaman"}
                className={`${
                  isSubMenuOpen4 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/pengajuan/peminjaman"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaCartFlatbed className="mr-3" />
                <span>Ajukan Peminjaman</span>
              </Link>
            </li>
          </motion.ul>
        </li>

        <li
          className={`flex flex-col ${
            location.pathname.startsWith("/report") ? "border-t border-b" : ""
          }`}
        >
          <div
            className="flex items-center p-4 cursor-pointer transition-colors hover:opacity-80"
            onClick={toggleSubMenu5}
          >
            <FaPrint className="mr-3" />
            <span>Cetak Laporan</span>
            <FaArrowRight
              className={`ml-auto transition-transform ${
                isSubMenuOpen5 ? "rotate-90" : ""
              }`}
            />
          </div>
          <motion.ul
            className="pl-6 space-y-0"
            initial="hidden"
            animate={isSubMenuOpen5 ? "visible" : "hidden"}
            variants={submenuVariants}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link
                to={"/report/inventaris"}
                className={`${
                  isSubMenuOpen5 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/report/inventaris"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Laporan Inventaris</span>
              </Link>
            </li>
            <li>
              <Link
                to={"/report/kir"}
                className={`flex items-center p-4 transition-colors cursor-pointer ${
                  isSubMenuOpen5 ? "visible" : "hidden"
                } ${
                  location.pathname.startsWith("/report/kir")
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Laporan KIR</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/report/barangkeluar"}
                className={`${
                  isSubMenuOpen5 ? "visible" : " hidden "
                } flex items-center p-4 transition-colors cursor-pointer ${
                  location.pathname === "/report/barangkeluar"
                    ? "underline"
                    : "hover:opacity-80"
                }`}
              >
                <FaSignOutAlt className="mr-3" />
                <span>Laporan Barang Keluar</span>
              </Link>
            </li>
          </motion.ul>
        </li>

        <Link
          to={"/ruangan"}
          className={`flex items-center p-4 transition-colors cursor-pointer ${
            location.pathname === "/ruangan"
              ? "border-t border-b"
              : "hover:opacity-80"
          }`}
        >
          <FaStoreAlt className="mr-3" />
          <span>Kelola Ruangan</span>
        </Link>
        <Link
          to={"/scan"}
          className={`flex items-center p-4 transition-colors cursor-pointer ${
            location.pathname === "/scan"
              ? "border-t border-b"
              : "hover:opacity-80"
          }`}
        >
          <FaCamera className="mr-3" />
          <span>Scan Barang</span>
        </Link>

        {role === "admin" && (
          <Link
            to={"/karyawan"}
            className={`flex items-center p-4 transition-colors cursor-pointer ${
              location.pathname === "/karyawan"
                ? "border-t border-b"
                : "hover:opacity-80"
            }`}
          >
            <FaUsers className="mr-3" />
            <span>Kelola Pegawai</span>
          </Link>
        )}

        <li
          className={`flex items-center p-4 transition-colors cursor-pointer ${
            location.pathname === "/settings"
              ? "border-t border-b"
              : "hover:opacity-80"
          }`}
          onClick={() => {
            handleLogout();
          }}
        >
          <FaSignOutAlt className="mr-3" />
          <span>Keluar</span>
        </li>
      </ul>
    </motion.div>
  );
};

export default SideBar;
