import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { GetBarang } from "../../../../Service/API/Barang/Service_Barang";
import {  Data_Ruang } from "../../../../DataDummy/Data";
const FormPermintaan = () => {
  const [requests, setRequests] = useState([{ namaBarang: "", jumlah: "" }]);
  const [selectedRuang, setSelectedRuang] = useState("");
  const [barangList, setBarangList] = useState([]);

  useEffect(() => {
    const fetchBarang = async () => {
      try {
        const response = await GetBarang();
        if (response && response.data) {
          setBarangList(response.data); 
        }
      } catch (error) {
        console.error("Gagal memuat data barang:", error);
      }
    };

    fetchBarang();
  }, []);

  const handleRuangChange = (e) => {
    setSelectedRuang(e.target.value);
  };

  const handleItemChange = (index, e) => {
    const newRequests = [...requests];
    newRequests[index].namaBarang = e.target.value;
    setRequests(newRequests);
  };

  const handleJumlahChange = (index, e) => {
    const newRequests = [...requests];
    newRequests[index].jumlah = e.target.value;
    setRequests(newRequests);
  };

  const addItem = () => {
    setRequests([...requests, { namaBarang: "", jumlah: "" }]);
  };

  const removeItem = (index) => {
    const newRequests = [...requests];
    newRequests.splice(index, 1);
    setRequests(newRequests);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedRuang) {
      alert("Silakan pilih ruangan terlebih dahulu.");
      return;
    }
    console.log("Permintaan:", { ruangan: selectedRuang, items: requests });
    // Reset form
    setRequests([{ namaBarang: "", jumlah: "" }]);
    setSelectedRuang("");
  };

  const filteredItems = (currentIndex) => {
    const selectedItems = requests.map((req) => req.namaBarang);
    return barangList.filter(
      (item) =>
        !selectedItems.includes(item.namaBarang) ||
        item.namaBarang === requests[currentIndex].namaBarang
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-base font-semibold mb-4">Permintaan Barang</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="ruangan"
            className="block text-xs font-medium text-gray-700"
          >
            Pilih Ruangan
          </label>
          <select
            id="ruangan"
            value={selectedRuang}
            required
            onChange={handleRuangChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau text-sm"
          >
            <option value="" disabled>
              Pilih Ruangan
            </option>
            {Data_Ruang.map((ruang) => (
              <option key={ruang.id} value={ruang.namaRuangan}>
                {ruang.namaRuangan} - {ruang.lokasi}
              </option>
            ))}
          </select>
        </div>

        <div
          className={`${
            requests.length > 1 ? "overflow-x-auto h-[300px]" : ""
          }`}
        >
          {requests.map((request, index) => (
            <div key={index} className="space-y-4 relative">
              <div>
                <label
                  htmlFor={`namaBarang-${index}`}
                  className="block text-xs font-medium text-gray-700 mt-2"
                >
                  Nama Barang
                </label>
                <select
                  id={`namaBarang-${index}`}
                  value={request.namaBarang}
                  required
                  onChange={(e) => handleItemChange(index, e)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau text-sm"
                >
                  <option value="" disabled>
                    Pilih Barang
                  </option>
                  {filteredItems(index).map((item, i) => (
                    <option key={i} value={item.namaBarang}>
                      {item.namaBarang}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor={`jumlah-${index}`}
                  className="block text-xs font-medium text-gray-700"
                >
                  Jumlah
                </label>
                <input
                  type="number"
                  id={`jumlah-${index}`}
                  value={request.jumlah}
                  required
                  onChange={(e) => handleJumlahChange(index, e)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-hijau text-sm"
                  placeholder="Masukkan jumlah"
                  min="1"
                />
              </div>

              {requests.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className="absolute top-0 right-0 mt-2 text-red-600 hover:text-red-800"
                >
                  <FaTrash />
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addItem}
          className="border-hijau border text-gray-700 w-full py-2 rounded-md text-sm font-semibold hover:opacity-80"
        >
          <div className="flex items-center gap-2 justify-center">
            <FaPlus />
            <p>Tambah Kolom</p>
          </div>
        </button>

        <button
          type="submit"
          className="bg-hijau hover:opacity-80 text-white w-full py-2 rounded-md text-sm font-semibold hover:bg-hijau-dark"
        >
          Ajukan Permintaan
        </button>
      </form>
    </div>
  );
};

export default FormPermintaan;
