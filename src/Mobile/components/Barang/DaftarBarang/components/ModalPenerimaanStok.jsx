import React, { useState, useEffect } from "react";
import useLoadingStore from "../../../../../Utils/Zustand/useLoading";
import { GetBarang, updateBarangMasuk } from "../../../../../Service/API/Barang/Service_Barang";
import { FaTimes } from "react-icons/fa";
import LoadingButton from "../../../LoadingButton";
import Select from "react-select";

const ModalPenerimaanStok = ({ onClose, refresh }) => {
  const { loading, setLoading } = useLoadingStore();
  const [barangList, setBarangList] = useState([]);
  const [selectedBarang, setSelectedBarang] = useState(null);
  const [qty, setQty] = useState(1);
  const [keterangan, setKeterangan] = useState("");

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await GetBarang();
        const options = response.data.map(barang => ({
          value: barang.id,
          label: barang.namaBarang
        }));
        setBarangList(options);
      } catch (error) {
        console.error("Failed to fetch barang", error);
      }
    };

    fetchBarang();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        barangId: selectedBarang ? selectedBarang.value : "",
        qty,
        keterangan
      };
      await updateBarangMasuk(data);
      // Call refresh function to update the parent component
      refresh();
      // Close modal after success
      onClose();
    } catch (error) {
      console.error("Failed to update barang masuk", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed z-10 inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg md:w-[80%] w-[95%] relative"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <FaTimes />
        </button>
        <h2 className="text-base mb-4 font-semibold">Penerimaan Barang</h2>

        <div className={`space-y-4 $ h-[450px] sidebar-scrollable overflow-auto border p-6 rounded-sm`}>
          <div className="grid grid-cols-2 gap-2">
            <label htmlFor="kodeBarang">
              <strong className="text-sm">Pilih Barang</strong>
            </label>
            <Select
              id="kodeBarang"
              value={selectedBarang}
              onChange={setSelectedBarang}
              options={barangList}
              placeholder="Pilih Barang"
              required
              isClearable
              className="w-full text-xs focus:outline-none focus:ring-2 focus:ring-hijau"
            />
          </div>

          {selectedBarang && (
            <>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <label htmlFor="qty">
                  <strong className="text-sm">Jumlah Stok</strong>
                </label>
                <input
                  type="number"
                  id="qty"
                  value={qty}
                  min={1}
                  onChange={(e) => setQty(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <label htmlFor="keterangan">
                  <strong className="text-sm">Keterangan</strong>
                </label>
                <textarea
                  id="keterangan"
                  value={keterangan}
                  required
                  onChange={(e) => setKeterangan(e.target.value)}
                  className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
                />
              </div>
            </>
          )}
        </div>

        <button
          type="submit"
          disabled={loading || !selectedBarang}
          className="bg-hijau disabled:bg-gray-500 mt-4 w-full text-white px-4 py-2 text-xs rounded font-semibold hover:bg-hijau-dark"
        >
          <LoadingButton loading={loading} text="Simpan" />
        </button>
      </form>
    </div>
  );
};

export default ModalPenerimaanStok;
