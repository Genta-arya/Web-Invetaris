import React, { useState } from "react";
import LoadingButton from "../../LoadingButton";
import { FaTimes } from "react-icons/fa";
import { Toaster, toast } from "sonner";
import handleError from "../../../../Utils/HandleError";
import {
  rejectPermintaan,
  updatePermintaan,
} from "../../../../Service/API/Permintaan/service_Permintaan";

const ModalEditStatus = ({ data, onClose, refresh }) => {
  const [qty, setQty] = useState(data.qty);
  const [ruangan, setRuangan] = useState(data.ruangan.nama);
  const [loading, setLoading] = useState(false);
  console.log(data);
  const handleSave = async () => {
    if (qty > data.barang.qty) {
      toast.error("Stok tidak mencukupi, silakan masukkan jumlah yang sesuai.");
      return;
    }
    setLoading(true);
    try {
      await updatePermintaan(data.id, {
        qty,
        barang: data.barang,
        ruanganId: data.ruangan.id,
      });

      toast.success("Permintaan Berhasil disetujui");
      onClose();
      refresh();
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async (id) => {
    setLoading(true);
    try {
      await rejectPermintaan(id);

      toast.success("Permintaan Ditolak");
      refresh();
      onClose();
    } catch (error) {
      handleError(error);
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <form className="bg-white p-6 rounded shadow-lg md:w-[80%] w-[95%] relative">
          <button
            className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
            onClick={onClose}
          >
            <FaTimes />
          </button>
          <h2 className="text-base mb-4 font-semibold">
            Persetujuan Permintaan
          </h2>
          <div className="space-y-4 overflow-auto border p-6 rounded-sm">
            <label
              htmlFor="ruangan"
              className="block text-xs font-medium text-gray-700"
            >
              Tujuan Ruangan
            </label>
            <input
              type="text"
              placeholder="Masukkan Nama Ruangan"
              name="ruangan"
              required
              id="ruangan"
              value={ruangan}
              readOnly
              onChange={(e) => setRuangan(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
            <label
              htmlFor="barang"
              className="block text-xs font-medium text-gray-700"
            >
              Nama Barang
            </label>
            <input
              type="text"
              placeholder="Masukkan Nama Ruangan"
              name="barang"
              required
              id="barang"
              value={data.barang.namaBarang}
              readOnly
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />

            <label
              htmlFor="qty"
              className="block text-xs font-medium text-gray-700"
            >
              Jumlah Barang
            </label>
            <input
              type="number"
              placeholder="Masukkan Jumlah Barang"
              name="qty"
              required
              id="qty"
              value={qty}
              max={data.barang.qty}
              onChange={(e) => setQty(parseInt(e.target.value))}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
            <p className="text-xs text-gray-500 mt-1">
              Stok tersedia: {data.barang.qty}
            </p>
          </div>
          <button
            type="button"
            onClick={handleSave}
            className="bg-hijau mt-4 w-full text-white px-4 py-2 text-xs rounded font-semibold hover:bg-hijau-dark"
            disabled={loading}
          >
            {loading ? (
              <LoadingButton text="Menyimpan..." />
            ) : (
              "Setujui Permintaan"
            )}
          </button>
          <button
            type="button"
            onClick={() => handleReject(data.id)}
            className="border-hijau border mt-2 w-full text-gray-600 px-4 py-2 text-xs rounded font-semibold hover:bg-hijau-dark"
            disabled={loading}
          >
            {loading ? (
              <LoadingButton text="Menyimpan..." />
            ) : (
              "Tolak Permintaan"
            )}
          </button>
        </form>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export default ModalEditStatus;
