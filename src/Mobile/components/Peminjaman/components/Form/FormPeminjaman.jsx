import React, { useEffect, useState } from "react";
import { GetBarang } from "../../../../../Service/API/Barang/Service_Barang";
import { toast, Toaster } from "sonner";
import handleError from "../../../../../Utils/HandleError";
import { postPeminjaman } from "../../../../../Service/API/Peminjaman/Service_Peminjaman";
import LoadingButton from "../../../LoadingButton";

const FormPeminjaman = () => {
  const [barang, setBarang] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState("");
  const [namaPeminjam, setNamaPeminjam] = useState("");
  const [jumlah, setJumlah] = useState("");
  const [stokBarang, setStokBarang] = useState(0);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await GetBarang();
        const filterJenis = response.data.filter((item) => item.jenis === "Asset");
        setBarang(filterJenis); // Asumsi data adalah array barang
      } catch (error) {
        console.error("Error fetching barang:", error);
      }
    };

    fetchBarang();
  }, []);

  useEffect(() => {
    // Update stok barang berdasarkan barang yang dipilih
    const selected = barang.find((item) => item.id === selectedBarang);
    if (selected) {
      setStokBarang(selected.qty); // Asumsi qty adalah field pada data barang
    } else {
      setStokBarang(0); // Reset stok jika tidak ada barang yang dipilih
    }
  }, [selectedBarang, barang]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (jumlah > stokBarang) {
      toast.error("Jumlah yang dipinjam melebihi stok yang tersedia.");
      return;
    }

    setLoading(true);
    try {
      await postPeminjaman({
        barangId: selectedBarang,
        nama : namaPeminjam,
        qty: parseInt(jumlah),
      });
      toast.success("Peminjaman Berhasil diajukan");
      
      setSelectedBarang("");
      setNamaPeminjam("");
      setJumlah("");
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  const quantityOptions = Array.from(
    { length: stokBarang },
    (_, index) => index + 1
  );

  return (
    <div className="p-6 rounded-lg w-full text-sm">
      <h2 className="text-lg font-semibold mb-4">Peminjaman Barang</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-xs font-medium text-gray-700"
            htmlFor="namaPeminjam"
          >
            Nama Peminjam
          </label>
          <input
            type="text"
            id="namaPeminjam"
            placeholder="Masukkan Nama Peminjam"
            value={namaPeminjam}
            onChange={(e) => setNamaPeminjam(e.target.value)}
            className="mt-1 block w-full border-hijau py-2 px-3 text-xs border rounded-md shadow-sm outline-none sm:text-sm"
            required
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-xs font-medium text-gray-700"
            htmlFor="barang"
          >
            Nama Barang
          </label>
          <select
            id="barang"
            value={selectedBarang}
            onChange={(e) => setSelectedBarang(e.target.value)}
            className="mt-1 block w-full border-hijau py-2 px-3 text-xs border rounded-md shadow-sm outline-none sm:text-sm"
            required
          >
            <option value="">Pilih Barang</option>
            {barang.map((item) => (
              <option key={item.id} value={item.id}>
                {item.namaBarang}
              </option>
            ))}
          </select>
        </div>

        {selectedBarang && (
          <div className="mb-4">
            <label
              className="block text-xs font-medium text-gray-700"
              htmlFor="jumlah"
            >
              Jumlah
            </label>
            <select
              id="jumlah"
              value={jumlah}
              onChange={(e) => setJumlah(Number(e.target.value))}
              className="mt-1 block w-full border-hijau py-2 px-3 text-xs border rounded-md shadow-sm outline-none sm:text-sm"
              required
            >
              <option value="">Pilih Jumlah</option>
              {quantityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="text-xs items-center px-4 py-2.5 border border-transparent font-bold rounded-md shadow-sm text-white bg-hijau hover:opacity-80 w-full flex justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <LoadingButton loading={loading} text={"Ajukan Peminjaman"} />
        </button>
      </form>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default FormPeminjaman;
