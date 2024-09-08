import React, { useEffect, useState } from "react";
import handleError from "../../../../../Utils/HandleError";
import { getBarangKeluar } from "../../../../../Service/API/Barang/Service_Barang";
import { formatTanggal } from "./../../../../../Utils/Format";
import LoadingGlobal from "../../../LoadingGlobal";
import { useNavigate } from "react-router-dom";
import TableBarangKeluar from "./TableBarangKeluar";
import ItemNotFound from "../../../../ItemNotFound";

const jenisStyles = {
  "Habis Pakai": "bg-blue-100 text-blue-800",
  Asset: "bg-green-100 text-green-800",
};

const ContentBarangKeluar = () => {
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRuangan, setFilterRuangan] = useState("");
  const [searchNamaBarang, setSearchNamaBarang] = useState("");
  const [filterTanggal, setFilterTanggal] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [filterJenisBarang, setFilterJenisBarang] = useState("");
  const [filteredBarangKeluar, setFilteredBarangKeluar] = useState([]);
  const [jenisBarangOptions] = useState(["Habis Pakai", "Asset"]);

  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getBarangKeluar(filterTanggal);
      const data = response.data;
      setBarangKeluar(data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filterTanggal]);

  useEffect(() => {
    const dataToDisplay = barangKeluar.filter((item) => {
      const matchesRuangan =
        filterRuangan === "" || item.ruanganNama === filterRuangan;

      const matchesNamaBarang = item.barangNama
        .toLowerCase()
        .includes(searchNamaBarang.toLowerCase());

      const matchesTanggal =
        filterTanggal === "" ||
        formatTanggal(item.tanggal) === formatTanggal(filterTanggal);

      const matchesJenisBarang =
        filterJenisBarang === "" || item.barangJenis === filterJenisBarang;

      return (
        matchesRuangan &&
        matchesNamaBarang &&
        matchesTanggal &&
        matchesJenisBarang
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
    navigate(`/detail/${id}`);
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
              max={new Date().toISOString().split("T")[0]}
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
          <ItemNotFound text={"Tidak ada barang keluar pada tanggal tersebut"} />
        </p>
      ) : (
        <TableBarangKeluar
          filteredBarangKeluar={filteredBarangKeluar}
          handleNavigate={handleNavigate}
          formatTanggal={formatTanggal}
          jenisStyles={jenisStyles}
        />
      )}
    </div>
  );
};

export default ContentBarangKeluar;
