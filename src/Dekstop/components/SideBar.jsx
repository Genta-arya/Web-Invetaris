import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHome,
  FaWarehouse,
  FaClipboardList,

  FaArrowRight,
  FaSignOutAlt,

  FaStoreAlt,
  FaCamera,
  FaUsers,
  FaCogs,

} from 'react-icons/fa';

const SideBar = () => {
  const location = useLocation();
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
  const [isSubMenuOpen1, setIsSubMenuOpen1] = useState(false);
  const [isSubMenuOpen2, setIsSubMenuOpen2] = useState(false);

  const toggleSubMenu = () => setIsSubMenuOpen(!isSubMenuOpen);
  const toggleSubMenu1 = () => setIsSubMenuOpen1(!isSubMenuOpen1);
  const toggleSubMenu2 = () => setIsSubMenuOpen2(!isSubMenuOpen2);

  return (
    <motion.div
      className="w-64 bg-hijau h-full fixed top-0 left-0 z-50 text-white shadow-lg overflow-x-auto pb-12"
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={{
        hidden: { x: '-100%' },
        visible: { x: 0 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    >
      <div className="text-center text-lg font-bold py-6 border-b border-white flex flex-col">
        <span className="text-white">SI-ASKA</span>
        <span className='text-sm'>SMKN 2 KETAPANG</span>
        <span className='text-sm'>v.1.0</span>
      </div>
      <ul className="mt-4 space-y-1 text-sm">
        <Link to={'/'} className={`flex items-center p-4 transition-colors cursor-pointer ${location.pathname === '/' ? 'border-t border-b' : 'hover:opacity-80'}`}>
          <FaHome className="mr-3" />
          <span>Dashboard</span>
        </Link>
        <li className={`flex flex-col ${location.pathname.startsWith('/inventory') ? 'border-t border-b' : ''}`}>
          <div 
            className="flex items-center p-4 cursor-pointer transition-colors hover:opacity-80"
            onClick={toggleSubMenu}
          >
            <FaWarehouse className="mr-3" />
            <span>Inventaris</span>
            <FaArrowRight className={`ml-auto transition-transform ${isSubMenuOpen ? 'rotate-90' : ''}`} />
          </div>
          <motion.ul
            className="pl-6 space-y-0"
            initial="hidden"
            animate={isSubMenuOpen ? 'visible' : 'hidden'}
            variants={{
              hidden: { height: 0, opacity: 0 },
              visible: { height: 'auto', opacity: 1 },
            }}
            transition={{ duration: 0.3 }}
          >
            <li>
              <Link to={'/inventory'} className={`${isSubMenuOpen ? "visible" : "hidden"} flex items-center p-4 transition-colors cursor-pointer ${location.pathname === '/inventory' ? 'underline' : 'hover:opacity-80'}`}>
                <FaClipboardList className="mr-3" />
                <span>Inventaris Barang</span>
              </Link>
            </li>
            {/* Tambahkan item submenu lainnya di sini */}
          </motion.ul>
        </li>
        
        {/* Tambahkan lebih banyak item sidebar dengan submenu di sini jika diperlukan */}
        
        <Link to={'/ruangan'} className={`flex items-center p-4 transition-colors cursor-pointer ${location.pathname === '/ruangan' ? 'border-t border-b' : 'hover:opacity-80'}`}>
          <FaStoreAlt className="mr-3" />
          <span>Kelola Ruangan</span>
        </Link>
        <Link to={'/scan'} className={`flex items-center p-4 transition-colors cursor-pointer ${location.pathname === '/scan' ? 'border-t border-b' : 'hover:opacity-80'}`}>
          <FaCamera className="mr-3" />
          <span>Scan Barang</span>
        </Link>
        <li className={`flex items-center p-4 transition-colors cursor-pointer ${location.pathname === '/users' ? 'border-t border-b' : 'hover:opacity-80'}`}>
          <FaUsers className="mr-3" />
          <span>Kelola User</span>
        </li>
        <li className={`flex items-center p-4 transition-colors cursor-pointer ${location.pathname === '/settings' ? 'border-t border-b' : 'hover:opacity-80'}`}>
          <FaCogs className="mr-3" />
          <span>Pengaturan</span>
        </li>

        <li className={`flex items-center p-4 transition-colors cursor-pointer ${location.pathname === '/settings' ? 'border-t border-b' : 'hover:opacity-80'}`}>
          <FaSignOutAlt className="mr-3" />
          <span>Keluar</span>
        </li>
      </ul>
    </motion.div>
  );
};

export default SideBar;
