import React, { useEffect, useState } from "react";
import handleError from "../../../../../Utils/HandleError";
import { getBarangKeluar } from "../../../../../Service/API/Barang/Service_Barang";
import { formatTanggal } from "./../../../../../Utils/Format";
import LoadingGlobal from "../../../LoadingGlobal";
import { useNavigate } from "react-router-dom";
const jenisStyles = {
  "Habis Pakai": "bg-blue-100 text-blue-800",
  Asset: "bg-green-100 text-green-800",
};
const ContentBarangKeluar = () => {
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRuangan, setFilterRuangan] = useState("");
  const [searchNamaBarang, setSearchNamaBarang] = useState("");
  const [filterTanggal, setFilterTanggal] = useState("");
  const [filterJenisBarang, setFilterJenisBarang] = useState("");
  const [filteredBarangKeluar, setFilteredBarangKeluar] = useState([]);
  const [ruanganOptions, setRuanganOptions] = useState([]);
  const [jenisBarangOptions] = useState(["Habis Pakai", "Asset"]);
 const navigate = useNavigate()
  const fetchData = async () => {
    try {
      const response = await getBarangKeluar();
      const data = response.data;

      setBarangKeluar(data);

      // Menyiapkan opsi ruangan
      const uniqueRuangan = Array.from(
        new Set(
          data.flatMap((item) =>
            item.barang.permintaan.map((p) => p.ruangan?.nama)
          )
        )
      ).filter(Boolean);

      setRuanganOptions(uniqueRuangan);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const dataToDisplay = barangKeluar.filter((item) => {
      const matchesRuangan =
        filterRuangan === "" ||
        item.barang.permintaan.some(
          (p) => p.ruangan?.nama === filterRuangan
        );
  
      const matchesNamaBarang = item.barang.namaBarang
        .toLowerCase()
        .includes(searchNamaBarang.toLowerCase());
  
      const matchesTanggal =
        filterTanggal === "" ||
        formatTanggal(item.tanggal) === formatTanggal(filterTanggal);
  
      const matchesJenisBarang =
        filterJenisBarang === "" ||
        item.barang.jenis === filterJenisBarang;
  
      return (
        matchesRuangan && matchesNamaBarang && matchesTanggal && matchesJenisBarang
      );
    });
  
    setFilteredBarangKeluar(dataToDisplay);
  }, [
    barangKeluar,
    filterRuangan,
    searchNamaBarang,
    filterTanggal,
    filterJenisBarang,
  ]);

  const handleNavigate = (id) => {
    navigate(`/detail/${id}`)
  };
  

  if (loading) {
    return <LoadingGlobal />;
  }

  return (
    <div className="p-6 lg:px-12">
      <div className="mb-6">
        <div className="flex flex-wrap gap-4">
         

          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="namaBarang"
              className="block text-sm font-bold mb-2"
            >
              Cari Nama Barang:
            </label>
            <input
              type="text"
              id="namaBarang"
              value={searchNamaBarang}
              onChange={(e) => setSearchNamaBarang(e.target.value)}
              placeholder="Masukkan nama barang"
              className="border border-gray-300 outline-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="filterTanggal"
              className="block text-sm font-bold mb-2"
            >
              Tanggal:
            </label>
            <input
              type="date"
              id="filterTanggal"
              value={filterTanggal}
              onChange={(e) => setFilterTanggal(e.target.value)}
              className="border border-gray-300 outline-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-hijau"
            />
          </div>

          <div className="flex-1 min-w-[200px]">
            <label
              htmlFor="filterJenisBarang"
              className="block text-sm font-bold mb-2"
            >
              Jenis Barang:
            </label>
            <select
              id="filterJenisBarang"
              value={filterJenisBarang}
              onChange={(e) => setFilterJenisBarang(e.target.value)}
              className="border border-gray-300 outline-none rounded-lg px-4 py-2 text-sm w-full focus:ring-2 focus:ring-hijau"
            >
              <option value="">Semua Jenis</option>
              {jenisBarangOptions.map((jenis, index) => (
                <option key={index} value={jenis}>
                  {jenis}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredBarangKeluar.length === 0 ? (
        <p className="text-sm text-center mt-24">
          Tidak ada data barang keluar.
        </p>
      ) : (
        <div className="overflow-x-auto scroll-container">
          <table className="min-w-full bg-white shadow-lg rounded-lg ">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                  Nama Barang
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                  Ruangan
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                  Tanggal
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                  Jumlah Keluar
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                  Sisa Stok
                </th>
                <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-700">
                  Jenis Barang
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBarangKeluar.map((item, index) => {
                const barang = item.barang || {};
                const permintaan = item.barang?.permintaan?.[0] || {};
               

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-200 hover:transition-colors cursor-pointer"
                    onClick={() =>
                      handleNavigate(permintaan.barangId, item.barang.jenis)
                    }
                  >
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {barang.namaBarang || "Nama Barang Tidak Tersedia"}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {permintaan.ruangan?.nama || "N/A"}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      {formatTanggal(item.tanggal)}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700 text-center">
                      {item.qty || 0}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700 text-center">
                      {barang.qty || 0}
                    </td>
                    <td className="px-4 py-2 border-b text-sm text-gray-700">
                      <span
                        className={`inline-block px-3 py-1 text-xs font-bold rounded-full ${
                          jenisStyles[barang.jenis] || "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {barang.jenis || "Jenis Tidak Tersedia"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ContentBarangKeluar;
