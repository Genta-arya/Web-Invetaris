import React, { useState, useEffect } from "react";
import { getBarangMasuk } from "../../../../../Service/API/Barang/Service_Barang";
import { formatDate } from "../../../../../Utils/Format";
import ItemNotFound from "../../../../ItemNotFound";

const TableBarangMasuk = () => {
  const [barangMasuk, setBarangMasuk] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]); // Default to today's date
  const [searchTerm, setSearchTerm] = useState("");
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const fetchBarangMasuk = async () => {
      try {
        const response = await getBarangMasuk(date);
        if (response.data.length === 0) {
          setNoData(true);
        } else {
          setNoData(false);
        }
        setBarangMasuk(response.data);
      } catch (error) {
        console.error("Failed to fetch barang masuk:", error);
      }
    };

    fetchBarangMasuk();
  }, [date]);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBarangMasuk = barangMasuk.filter((item) =>
    item.barang.namaBarang.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4">
      <div className="flex items-center gap-4 mb-4">
        <div>
          <label
            htmlFor="dateFilter"
            className="block text-xs mb-2 font-bold text-gray-700"
          >
            Filter Tanggal:
          </label>
          <input
            type="date"
            id="dateFilter"
            value={date}
            onChange={handleDateChange}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
        </div>

        <div>
          <label
            htmlFor="searchFilter"
            className="block text-xs mb-2 font-bold text-gray-700"
          >
            Cari Barang:
          </label>
          <input
            type="text"
            id="searchFilter"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari nama barang..."
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
        </div>
      </div>

      <div className="scroll-container">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr className="text-xs">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Barang</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Keterangan</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 text-start">
            {noData ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-gray-500">
                  <ItemNotFound text={"Data Tidak Ditemukan untuk tanggal ini"} />
                </td>
              </tr>
            ) : filteredBarangMasuk.length === 0 && searchTerm.length > 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-gray-500">
                  <ItemNotFound text={"Barang Tidak Ditemukan, dengan kata kunci pencarian ini"} />
                </td>
              </tr>
            ) : (
              filteredBarangMasuk.map((item, index) => (
                <tr key={index} className="text-xs">
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.barang.namaBarang}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.qty}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{item.keterangan || "-"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{formatDate(item.tanggal)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableBarangMasuk;
