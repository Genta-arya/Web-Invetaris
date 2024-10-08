import React, { useState } from "react";
import Select from "react-select"; // Import react-select
import LoadingButton from "../../LoadingButton";
import { Toaster, toast } from "sonner";
import { FaTimes } from "react-icons/fa";
import handleError from "../../../../Utils/HandleError";
import { AddUsulan } from "../../../../Service/API/Usulan/Service_Usulan";
import { DataUnit } from "../../../../Service/DataUnit/DataUnitKerja";

const ModalUsulan = ({ onClose, refresh }) => {
  const [namaBarang, setNamaBarang] = useState("");
  const [namaOrang, setNamaOrang] = useState(""); // State for person's name
  const [selectedUnit, setSelectedUnit] = useState(null); // State for selected unit
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AddUsulan({ namaBarang, nama: namaOrang, unit: selectedUnit.label });
      toast.success("Pengajuan Usulan Barang Berhasil diajukan", {
        onAutoClose: () => {
          refresh();
          onClose();
        }
      });
    } catch (error) {
      handleError(error);
    }
  };

  // Format DataUnit for react-select
  const options = DataUnit.map((unit) => ({
    value: unit.id,
    label: unit.name
  }));

  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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
          <h2 className="text-base mb-4 font-semibold">Pengusulan Barang</h2>
          <div className="space-y-4">
            <label
              htmlFor="namaBarang"
              className="block text-xs font-medium text-gray-700"
            >
              Nama Barang
            </label>
            <div className="mt-1">
              <input
                type="text"
                placeholder="Ketikkan Nama Barang"
                name="namaBarang"
                value={namaBarang}
                maxLength={15}
                onChange={(e) => setNamaBarang(e.target.value)}
                required
                id="namaBarang"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
              />
            </div>

            <label
              htmlFor="namaOrang"
              className="block text-xs font-medium text-gray-700"
            >
              Nama Pengusul
            </label>
            <div className="mt-1">
              <input
                type="text"
                placeholder="Ketikkan Nama Pengusul"
                name="namaOrang"
                maxLength={15}
                value={namaOrang}
                onChange={(e) => setNamaOrang(e.target.value)}
                required
                id="namaOrang"
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-hijau"
              />
            </div>

            <label
              htmlFor="unit"
              className="block text-xs font-medium text-gray-700"
            >
              Unit Kerja
            </label>
            <div className="mt-1">
              <Select
                id="unit"
                options={options}
                value={selectedUnit}
                onChange={setSelectedUnit}
                placeholder="Pilih Unit Kerja"
                className="basic-single text-xs"
                classNamePrefix="select"
                isClearable
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-hijau mt-4 w-full text-white px-4 py-2 text-xs rounded font-semibold hover:bg-hijau-dark"
          >
            {loading ? <LoadingButton text="Submitting..." /> : "Submit"}
          </button>
        </form>
      </div>
      <Toaster duration={1500} position="top-right" richColors />
    </div>
  );
};

export default ModalUsulan;
