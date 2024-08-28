import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { FaCartFlatbedSuitcase, FaSignHanging } from "react-icons/fa6";
import { FaBoxOpen, FaClipboardList, FaHome, FaSearch, FaSignOutAlt, FaStoreAlt } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // Mengambil lokasi saat ini

  // Daftar rute yang ingin dicari beserta ikonnya
  const routes = [
    { path: "/", name: "Dashboard", icon: <FaHome /> },
    { path: "/scan", name: "Scan Barang", icon: <FaBoxOpen /> },
    { path: "/inventory", name: "Inventaris Barang", icon: <FaClipboardList /> },
    { path: "/ruangan", name: "Kelola Ruangan", icon: <FaStoreAlt /> },
    { path: "/permintaan", name: "Kelola Permintaan", icon: <FaClipboardList /> },
    { path: "/inventory/barang-masuk", name: "Barang Masuk", icon: <FaSignOutAlt /> },
    { path: "/inventory/barang-keluar", name: "Barang Keluar", icon: <FaSignHanging /> },
    { path: "/pengajuan/permintaan", name: "Ajukan Permintaan", icon: <FaCartFlatbedSuitcase /> },
  ];

  // Fungsi untuk menangani perubahan input dan menampilkan saran
  const handleInputChange = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (value) {
      const filteredSuggestions = routes.filter((route) =>
        route.name.toLowerCase().includes(value)
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  // Fungsi untuk menangani klik pada saran dan menavigasi ke rute yang dipilih
  const handleSuggestionClick = (path) => {
    if (path !== location.pathname) {
      navigate(path);
      setQuery("");
      setSuggestions([]);
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <FaSearch className="absolute left-3 text-gray-500" />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Cari menu / Pindah ke menu..."
          className="px-10 py-1.5 w-full border rounded-lg border-gray-400 focus:outline-none"
        />
      </div>
      {suggestions.length > 0 && (
        <ul className="absolute top-full left-0 w-full bg-white border rounded mt-1 z-10">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.path}
              onClick={() => handleSuggestionClick(suggestion.path)}
              className={`flex items-center px-4 py-2 cursor-pointer ${suggestion.path === location.pathname ? 'bg-gray-200 cursor-default' : 'hover:bg-gray-200'}`}
            >
              <span className="mr-3">{suggestion.icon}</span>
              {suggestion.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
