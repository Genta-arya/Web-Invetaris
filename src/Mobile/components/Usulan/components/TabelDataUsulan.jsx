import React, { useState, useEffect } from "react";
import { FaCalendar, FaPlus } from "react-icons/fa";
import ModalUsulan from "./ModalUsulan";
import {
  getDataUsulan,
  HandledeleteUsulan,
  updateNamaBarangUsulan,
  updateStatusUsulan,
} from "../../../../Service/API/Usulan/Service_Usulan";
import handleError from "../../../../Utils/HandleError";
import "react-datepicker/dist/react-datepicker.css";
import useLoadingStore from "../../../../Utils/Zustand/useLoading";
import LoadingGlobal from "../../LoadingGlobal";
import { toast, Toaster } from "sonner";
import useAuth from "../../../../Utils/Zustand/useAuth";
import { useNavigate } from "react-router-dom";

const TabelDataUsulan = () => {
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [data, setData] = useState([]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [editingItemId, setEditingItemId] = useState(null);
  const [editName, setEditName] = useState("");
  const { loading, setLoading } = useLoadingStore();
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    fetchData();
  }, [date, statusFilter]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getDataUsulan(date, statusFilter);
      setData(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day} - ${month} - ${year}`;
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setStatusFilter(null);
  };

  const handleStatusChange = async (id, newStatus) => {
    setLoading(true);
    try {
      await updateStatusUsulan(id, newStatus);
      fetchData();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditName(item.namaBarang);
  };

  const handleInputChange = (e) => {
    setEditName(e.target.value);
  };

  const handleSaveClick = async (itemId) => {
    setLoading(true);
    try {
      if (!editName) return toast.error("Nama Barang tidak boleh kosong");
      await updateNamaBarangUsulan(itemId, editName);
      fetchData();
      setEditingItemId(null);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteUsulan = async (id) => {
    setLoading(true);
    try {
      await HandledeleteUsulan(id);
      fetchData();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  const handleReport = (id) => {
    navigate(`/report/usulan/${id}`);
  };

  if (loading) return <LoadingGlobal />;

  return (
    <div className="p-4">
      <div className="flex flex-col gap-2 mb-4">
        <div className="flex w-full items-center gap-2">
          {user.role === "admin" && (
            <button
              onClick={() => setOpenModalAdd(true)}
              className="bg-hijau flex justify-center text-white px-4 py-2 rounded shadow-md text-xs hover:opacity-80"
            >
              <div className="flex items-center gap-2 font-bold transition-opacity">
                <FaPlus />
                <p>Pengajuan</p>
              </div>
            </button>
          )}
          <div className="">
            <select
              id="statusFilter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-hijau py-1.5 px-2 rounded text-xs w-full"
            >
              <option value="">Pilih Status</option>
              <option value="-">Belum Diverifikasi</option>
              <option value="true">Disetujui</option>
              <option value="false">Ditolak</option>
            </select>
          </div>
          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            onChange={handleDateChange}
            className="border border-hijau py-2 px-3 rounded text-xs"
          />
        </div>
      </div>

      <div className="scroll-container overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-xs">
          <thead>
            <tr className="bg-gray-100 text-gray-700 text-center">
              <th className="border border-gray-300 p-2">No</th>
              <th className="border border-gray-300 p-2">Nama</th>
              <th className="border border-gray-300 p-2">Unit Kerja</th>
              <th className="border border-gray-300 p-2">Nama Barang</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Tanggal</th>
              {user.role === "admin" && (
                <th className="border border-gray-300 p-2">Aksi</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 p-2">{index + 1}</td>
                  <td className="border border-gray-300 p-2">{item.nama}</td>
                  <td className="border border-gray-300 p-2"> {item.unit}</td>
                  <td
                    className="border border-gray-300 p-2"
                    title="Klik 2x untuk edit"
                  >
                    {editingItemId === item.id ? (
                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          value={editName}
                          placeholder="Masukkan Nama Barang"
                          onChange={handleInputChange}
                          required
                          className="border  p-2 rounded outline-none border-hijau"
                        />
                        <button
                          title="Simpan Perubahan"
                          onClick={() => handleSaveClick(item.id)}
                          className="bg-hijau text-xs text-white px-2 font-bold py-2 rounded"
                        >
                          Simpan
                        </button>
                        <button
                          onClick={() => setEditingItemId(null)}
                          className="border-hijau text-xs text-gray-600 border px-4 font-bold py-2 rounded"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled={user.role !== "admin"}
                        onDoubleClick={() => handleEditClick(item)}
                        className="cursor-pointer"
                      >
                        {item.namaBarang}
                      </button>
                    )}
                  </td>
                  <td className="border border-gray-300 p-2">
                    <select
                      className="border border-gray-300 p-2"
                      value={item.status === "belum" ? "" : item.status}
                      onChange={(e) =>
                        handleStatusChange(item.id, e.target.value)
                      }
                    >
                      <option value="">
                        {item.status === "belum"
                          ? "Belum Diverifikasi"
                          : item.status === "tolak"
                          ? "Ditolak"
                          : "Disetujui"}
                      </option>
                      {(item.status === "belum" || item.status === "tolak" ) && user.role === "admin" && (
                        <option value="true">Disetujui</option>
                      )}
                      { (item.status === "belum" || item.status === "setuju" ) && user.role === "admin" && (
                        <option value="false">Ditolak</option>
                      )}
                    </select>
                  </td>
                  <td className="border border-gray-300 p-2">
                    {formatDate(item.createdAt)}
                  </td>
                  {user.role === "admin" && (
                    <td className="border border-gray-300 p-2">
                      <div className="flex gap-2 justify-center">
                        <button
                          title="Print Dokumen"
                          onClick={() => handleReport(item.id)}
                          disabled={item.status !== "setuju"}
                          className="border-hijau disabled:cursor-not-allowed text-gray-800 font-bold border-2 w-14 px-2 py-1 rounded"
                        >
                          Print
                        </button>
                        <button
                          onClick={() => deleteUsulan(item.id)}
                          className="border-hijau text-gray-800 font-bold border-2 w-14 px-2 py-1 rounded"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border border-gray-300 p-2 font-bold text-gray-500 text-center"
                >
                  Pengajuan Usulan Tidak ditemukan
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {openModalAdd && (
        <ModalUsulan
          refresh={fetchData}
          onClose={() => setOpenModalAdd(false)}
        />
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default TabelDataUsulan;
