import React, { useEffect, useState } from "react";
import handleError from "../../../../Utils/HandleError";
import { getPermintaan } from "../../../../Service/API/Permintaan/service_Permintaan";
import LoadingGlobal from "../../LoadingGlobal";
import { formatTanggal } from "../../../../Utils/Format";
import CustomDatePicker from "./CustomeDateFilter";
import ModalEditStatus from "./ModalEditStatus";
import ItemNotFound from "../../../ItemNotFound";
import useAuth from "../../../../Utils/Zustand/useAuth";

const ListPermintaan = () => {
  const today = new Date().toISOString().split("T")[0];
  const [permintaan, setPermintaan] = useState([]);
  const [filteredPermintaan, setFilteredPermintaan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterTanggal, setFilterTanggal] = useState(today);
  const [filterStatus, setFilterStatus] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBy, setSearchBy] = useState("barang");
  const [openEdit, setOpenEdit] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const { user } = useAuth();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getPermintaan(filterTanggal);
      setPermintaan(response.data);
      setFilteredPermintaan(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (data) => {
    setSelectData(data);
    setOpenEdit(true);
  };

  const handleFilterChange = (e) => {
    const selectedDate = e.target.value;
    setFilterTanggal(selectedDate);
    applyFilters(selectedDate, filterStatus, searchTerm, searchBy);
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setFilterStatus(selectedStatus);
    applyFilters(filterTanggal, selectedStatus, searchTerm, searchBy);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    applyFilters(filterTanggal, filterStatus, term, searchBy);
  };

  const handleSearchByChange = (e) => {
    const selectedSearchBy = e.target.value;
    setSearchBy(selectedSearchBy);
    applyFilters(filterTanggal, filterStatus, searchTerm, selectedSearchBy);
  };

  const applyFilters = (date, status, term, searchBy) => {
    let filteredData = permintaan;

    if (status) {
      if (status === "disetujui") {
        filteredData = filteredData.filter((item) => item.status === true);
      } else if (status === "belum_disetujui") {
        filteredData = filteredData.filter((item) => item.status === null);
      } else if (status === "ditolak") {
        filteredData = filteredData.filter((item) => item.status === false);
      }
    }

    if (term) {
      filteredData = filteredData.filter((item) =>
        searchBy === "barang"
          ? item.barang.namaBarang.toLowerCase().includes(term)
          : item.ruangan.nama.toLowerCase().includes(term)
      );
    }

    setFilteredPermintaan(filteredData);
  };

  useEffect(() => {
    fetchData();
  }, [filterTanggal]);

  if (loading) return <LoadingGlobal />;

  return (
    <div className="p-4 lg:px-12">
      <div className="mb-4 flex gap-4">
        <div>
          <label className="block text-xs mb-2 font-bold text-gray-700">
            Tanggal
          </label>
          <CustomDatePicker
            value={filterTanggal}
            onChange={handleFilterChange}
          />
        </div>
        <div>
          <label className="block text-xs mb-2 font-bold text-gray-700">
            Status:
          </label>
          <select
            className="w-full text-xs px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau focus:border-hijau sm:text-sm"
            value={filterStatus}
            onChange={handleStatusChange}
          >
            <option value="">Semua Status</option>
            <option value="disetujui">Disetujui</option>
            <option value="ditolak">Ditolak</option>
            <option value="belum_disetujui">Belum Disetujui</option>
          </select>
        </div>
        <div>
          <label className="block text-xs mb-2 font-bold text-gray-700">
            Cari:
          </label>
          <select
            className="w-full text-xs px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau focus:border-hijau sm:text-sm"
            value={searchBy}
            onChange={handleSearchByChange}
          >
            <option value="barang">Nama Barang</option>
            <option value="ruangan">Nama Ruangan</option>
          </select>
        </div>
      </div>

      <div className="mb-4 relative">
        <input
          type="text"
          className="w-full text-xs px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau focus:border-hijau sm:text-sm"
          placeholder={`Cari ${searchBy === "barang" ? "Barang" : "Ruangan"}`}
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>

      {filteredPermintaan.length === 0 ? (
        <p className="text-center text-gray-500 text-sm mt-10 font-bold">
          <ItemNotFound text="Tidak ada permintaan Hari ini" />
        </p>
      ) : (
        <div className="overflow-x-auto scroll-container">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr className="text-center text-xs">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  No
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nama Barang
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Jumlah
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ruangan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tanggal Permintaan
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 text-center">
              {filteredPermintaan.map((item, index) => (
                <tr key={item.id} className="text-xs">
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {item.barang.namaBarang}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {item.qty}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {item.ruangan.nama}
                  </td>
                  <td
                    className={`px-6 py-4 whitespace-nowrap  hover:font-bold 
    ${
      item.status === true
        ? "text-green-500"
        : item.status === false
        ? "text-red-500"
        : "text-gray-500"
    }`}
                  >
                    <button
                      onClick={() => handleEdit(item)}
                      disabled={user.role !== "admin"}
                    >
                      {item.status === true
                        ? "Disetujui"
                        : item.status === false
                        ? "Ditolak"
                        : "Belum Disetujui"}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap  text-gray-500">
                    {formatTanggal(item.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {openEdit && (
        <ModalEditStatus
          refresh={fetchData}
          onClose={() => setOpenEdit(false)}
          open={openEdit}
          setOpen={setOpenEdit}
          data={selectData}
        />
      )}
    </div>
  );
};

export default ListPermintaan;
