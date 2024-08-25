import React, { useEffect, useState } from "react";
import handleError from "../../../../../Utils/HandleError";
import { getBarangKeluar } from "../../../../../Service/API/Barang/Service_Barang";
import { formatTanggal } from "./../../../../../Utils/Format";
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
  const [filteredBarangKeluar, setFilteredBarangKeluar] = useState([]);
  const [ruanganOptions, setRuanganOptions] = useState([]);
  const navigate = useNavigate();

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

  const handleNavigate = (id, jenis) => {
    if (jenis !== "Habis Pakai") {
      navigate(`/barang/ruangan/${id}`);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const dataToDisplay = barangKeluar.filter(
      (item) =>
        (filterRuangan === "" ||
          item.barang.permintaan.some(
            (p) => p.ruangan?.nama === filterRuangan
          )) &&
        item.barang.namaBarang
          .toLowerCase()
          .includes(searchNamaBarang.toLowerCase())
    );

    setFilteredBarangKeluar(dataToDisplay);
  }, [barangKeluar, filterRuangan, searchNamaBarang]);

  if (loading) {
    return <div className="text-center text-xs">Loading...</div>;
  }

  return (
    <div className="p-4">
      <div className="mb-4 space-y-4">
        <div>
          <label htmlFor="ruangan" className="block text-xs font-semibold mb-1">
            Ruangan:
          </label>
          <select
            id="ruangan"
            value={filterRuangan}
            onChange={(e) => setFilterRuangan(e.target.value)}
            className="border border-hijau outline-none rounded px-2 py-1 text-xs w-full"
          >
            <option value="">Semua Ruangan</option>
            {ruanganOptions.map((ruangan, index) => (
              <option key={index} value={ruangan}>
                {ruangan}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="namaBarang"
            className="block text-xs font-semibold mb-1"
          >
            Cari Nama Barang:
          </label>
          <input
            type="text"
            id="namaBarang"
            value={searchNamaBarang}
            onChange={(e) => setSearchNamaBarang(e.target.value)}
            placeholder="Masukkan nama barang"
            className="border border-hijau outline-none rounded px-2 py-1 text-xs w-full"
          />
        </div>
      </div>

      {filteredBarangKeluar.length === 0 ? (
        <p className="text-xs text-center mt-24">
          Tidak ada data barang keluar.
        </p>
      ) : (
        <div className="space-y-4">
          {filteredBarangKeluar.map((item, index) => {
            const barang = item.barang || {};
            const permintaan = item.barang?.permintaan?.[0] || {};

            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-4 hover:cursor-pointer hover:bg-slate-200"
                onClick={() =>
                  handleNavigate(permintaan.ruangan?.id, item.barang.jenis)
                }
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={barang.foto || "/path/to/default-image.jpg"}
                    alt={barang.namaBarang || "No image"}
                    className="w-16 h-16 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h2 className="text-sm font-semibold">
                      {barang.namaBarang || "Nama Barang Tidak Tersedia"}
                    </h2>
                    <p className="text-xs text-gray-600">
                      Ruangan: {permintaan.ruangan?.nama || "N/A"}
                    </p>
                    <p className="text-xs text-gray-600">
                      Tanggal: {formatTanggal(item.tanggal)}
                    </p>
                    <p className="text-xs text-gray-500">
                      Jumlah Keluar: {item.qty || 0}
                    </p>
                    <p className="text-xs text-gray-500">
                      Sisa Stok: {barang.qty || 0}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs font-semibold rounded-full ${
                        jenisStyles[barang.jenis] || "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {barang.jenis || "Jenis Tidak Tersedia"}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ContentBarangKeluar;
