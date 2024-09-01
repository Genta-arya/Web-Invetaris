import React, { useEffect, useState } from "react";

import ModalAddRuangan from "./ModalAddRuangan";
import {
  DeleteRuangan,
  getAllRuangan,
} from "../../../../Service/API/Ruangan/Service_Ruangan";
import handleError from "../../../../Utils/HandleError";
import useLoadingStore from "../../../../Utils/Zustand/useLoading";
import LoadingGlobal from "./../../LoadingGlobal";
import ModalEditRuangan from "./ModalEditRuangan";
import { toast, Toaster } from "sonner";
import { Link, Navigate } from "react-router-dom";
import useAuth from "../../../../Utils/Zustand/useAuth";

const TableRuangan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [OpenAdd, setOpenAdd] = useState(false);
  const [selectData, setSelectData] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);
  const [ruanganList, setRuanganList] = useState([]);
  const { loading, setLoading } = useLoadingStore();
  const { user } = useAuth();
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getAllRuangan();
      if (response && response.data) {
        setRuanganList(response.data);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  const HandleEdit = (data) => {
    setOpenEdit(true);
    setSelectData(data);
  };
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRuangan = ruanganList.filter((ruangan) =>
    ruangan.nama.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async (id) => {
    const message = `
        Menghapus ruangan ini akan menghapus:
        - Data Permintaan terkait
        - Data Inventaris terkait
        Tetapi akan mengembalikan semua stok barang
        Apakah Anda yakin ingin melanjutkan penghapusan ruangan ini?
    `;

    if (!window.confirm(message)) {
      return;
    }

    setLoading(true);
    try {
      await DeleteRuangan(id);
      fetchData();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingGlobal />;

  return (
    <div className="p-4 lg:px-12">
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Cari Nama Ruangan..."
          className="px-4 py-2 text-xs border-gray-400 focus:outline-none rounded border-2"
          value={searchTerm}
          onChange={handleSearch}
        />
        {user.role === "admin" && (
          <button
            className="border-hijau text-gray-800 font-bold border-2 text-xs px-2 py-1 rounded"
            onClick={() => setOpenAdd(true)}
          >
            Tambah Ruangan
          </button>
        )}
      </div>

      <div className="scroll-container overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="text-xs text-center">
              <th className="border-b py-2 px-4">No</th>
              <th className="border-b py-2 px-4">Nama Ruangan</th>

              <th className="border-b py-2 px-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-xs text-center">
            {filteredRuangan.map((ruangan, index) => (
              <tr key={ruangan.id}>
                <td className="border-b py-2 px-4">{index + 1}</td>
                <td className="border-b py-2 px-4">{ruangan.nama}</td>

                <td className="border-b py-2 px-4">
                  <div className="flex justify-center gap-2">
                    <Link
                      to={`/barang/ruangan/${ruangan.id}`}
                      className="border-hijau text-gray-800 font-bold border-2 w-14 px-2 py-1 rounded"
                    >
                      Detail
                    </Link>
                    {user.role === "admin" && (
                      <>
                        <button
                          onClick={() => HandleEdit(ruangan)}
                          className="border-hijau text-gray-800 font-bold border-2 w-14 px-2 py-1 rounded"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(ruangan.id)}
                          className="border-hijau text-gray-800 font-bold border-2 w-14 px-2 py-1 rounded"
                        >
                          Hapus
                        </button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {OpenAdd && (
        <ModalAddRuangan
          onClose={() => setOpenAdd(false)}
          refresh={fetchData}
        />
      )}
      {openEdit && (
        <ModalEditRuangan
          data={selectData}
          onClose={() => setOpenEdit(false)}
          refresh={fetchData}
        />
      )}
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default TableRuangan;
