import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import handleError from "../../../../../Utils/HandleError";
import { PostBarang } from "../../../../../Service/API/Barang/Service_Barang";
import { formatRupiah } from "../../../../../Utils/Format";
import useLoadingStore from "../../../../../Utils/Zustand/useLoading";
import { toast } from "sonner";
import LoadingButton from "../../../LoadingButton";

const ModalInput = ({ isOpen, onClose, refresh }) => {
  const [kodeBarang, setKodeBarang] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [nomorRegister, setNomorRegister] = useState("");
  const [merkType, setMerkType] = useState("");
  const [ukuran, setUkuran] = useState("");
  const [qty, setQty] = useState("");
  const [hargaBarang, setHargaBarang] = useState("");
  const [kondisi, setKondisi] = useState("");
  const [foto, setFoto] = useState(null);
  const [perolehan, setPerolehan] = useState("");
  const [jenisBarang, setJenisBarang] = useState("Habis Pakai"); // New state for item type
  const { loading, setLoading } = useLoadingStore();

  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  const handleFileChange = (event) => {
    setFoto(event.target.files[0]);
  };

  const handleHargaChange = (event) => {
    const value = event.target.value;
    const rawValue = value.replace(/[^\d]/g, "");
    setHargaBarang(rawValue);
  };

  const formatHargaBarang = (harga) => {
    if (!harga) return "";
    const value = harga.toString();
    return formatRupiah(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("kodeBarang", kodeBarang);
      formData.append("namaBarang", namaBarang);
      formData.append("nomorRegister", nomorRegister);
      formData.append("merkType", merkType);
      formData.append("ukuran", ukuran);
      formData.append("qty", qty);
      formData.append("tahun", new Date().getFullYear());
      formData.append("hargaBarang", hargaBarang);
      formData.append("kondisi", kondisi);
      formData.append("image", foto);
      formData.append("perolehan", perolehan);
      formData.append("jenis", jenisBarang); 

      await PostBarang(formData);
      refresh();
      toast.success("Barang Berhasil Ditambahkan");

      onClose();
      setKodeBarang("");
      setNamaBarang("");
      setNomorRegister("");
      setMerkType("");
      setUkuran("");
      setQty("");
      setHargaBarang("");
      setKondisi("");
      setFoto(null);
      setPerolehan("");
      setJenisBarang("Habis Pakai"); 
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
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
        <h2 className="text-base mb-4 font-semibold">Tambah Barang</h2>
        <div className="space-y-4 h-[450px] overflow-auto border p-6 rounded-sm">
          <input
            type="text"
            placeholder="Kode Barang"
            value={kodeBarang}
            required
            onChange={handleInputChange(setKodeBarang)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
          <input
            type="text"
            placeholder="Nomor Register"
            value={nomorRegister}
            required
            onChange={handleInputChange(setNomorRegister)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
          <input
            type="text"
            placeholder="Asal Perolehan"
            value={perolehan}
            required
            onChange={handleInputChange(setPerolehan)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
          <input
            type="text"
            placeholder="Nama Barang"
            value={namaBarang}
            required
            onChange={handleInputChange(setNamaBarang)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />

          <input
            type="text"
            placeholder="Merk Type"
            value={merkType}
            required
            onChange={handleInputChange(setMerkType)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />

          <input
            type="text"
            placeholder="Kondisi"
            value={kondisi}
            required
            onChange={handleInputChange(setKondisi)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
          <input
            type="text"
            placeholder="Ukuran"
            value={ukuran}
            required
            onChange={handleInputChange(setUkuran)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
          <input
            type="number"
            placeholder="Jumlah"
            value={qty}
            onChange={handleInputChange(setQty)}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />
          <input
            type="text"
            placeholder="Harga Barang"
            value={formatHargaBarang(hargaBarang)}
            required
            onChange={handleHargaChange}
            className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
          />

          <div>
            <label className="text-xs">Jenis Barang</label>
            <select
              value={jenisBarang}
              onChange={(e) => setJenisBarang(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            >
              <option value="Habis Pakai">Habis Pakai</option>
              <option value="Asset">Asset</option>
            </select>
          </div>

          <div>
            <label className="text-xs">Foto Barang</label>
            <input
              type="file"
              required
              placeholder="Upload Foto"
              onChange={handleFileChange}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>
        </div>
        <button
          disabled={loading}
          className="bg-hijau mt-4 w-full text-white px-4 py-2 text-xs rounded font-semibold hover:bg-hijau-dark"
        >
          <LoadingButton loading={loading} text="Submit" />
        </button>
      </form>
    </div>
  );
};

export default ModalInput;
