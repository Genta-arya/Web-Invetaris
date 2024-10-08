import React, { useEffect, useState } from "react";
import LoadingButton from "../../LoadingButton";
import useLoadingStore from "../../../../Utils/Zustand/useLoading";
import { FaTimes } from "react-icons/fa";
import { toast, Toaster } from "sonner";
import handleError from "./../../../../Utils/HandleError";
import { useNavigate } from "react-router-dom";
import { updateNamaRuangan } from "../../../../Service/API/Ruangan/Service_Ruangan";

const ModalEditRuangan = ({ onClose, refresh, data }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState(data.nama);
  const [kodeRuang, setKodeRuang] = useState(data.kodeRuang);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateNamaRuangan(data.id, name, kodeRuang);

      toast.success("Ruangan Berhasil Diganti", {
        onAutoClose: () => {
          onClose();
          refresh();
        },
      });
    } catch (error) {
      handleError(error, navigate);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow-lg md:w-[80%] w-[95%] relative"
        >
          <button
            onClick={onClose}
            disabled={loading}
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
          >
            <FaTimes />
          </button>
          <h2 className="text-base mb-4 font-semibold">Edit Ruangan</h2>
          <div className="space-y-4  overflow-auto border p-6 rounded-sm">
            <label
              htmlFor="name"
              className="block text-xs font-medium text-gray-700"
            >
              Nama Ruangan
            </label>
            <div className="mt-1">
              <input
                type="text"
                placeholder="Masukkan Nama Ruangan"
                name="name"
                value={name}
                maxLength={25}
                onChange={(e) => setName(e.target.value)}
                required
                id="name"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
              />
            </div>

            <label
              htmlFor="kode"
              className="block text-xs font-medium text-gray-700"
            >
              Kode Ruangan
            </label>
            <div className="mt-1">
              <input
                type="text"
                placeholder="Masukkan Kode Ruangan"
                name="kodeRuang"
                value={kodeRuang}
                maxLength={15}
                onChange={(e) => setKodeRuang(e.target.value)}
                required
                id="kodeRuang"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
              />
            </div>
          </div>
          <button
            disabled={loading}
            className="bg-hijau mt-4 w-full text-white px-4 py-2 text-xs rounded font-semibold hover:bg-hijau-dark"
          >
            <LoadingButton loading={loading} text="Simpan" />
          </button>
        </form>
      </div>
      <Toaster duration={1500} position="top-right" richColors />
    </div>
  );
};

export default ModalEditRuangan;
