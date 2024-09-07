import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalDate = ({
  onClose,
  selectedDate,
  setSelectedDate,
  onSave,
  refresh,
}) => {
  const handleSave = () => {
   

    if (typeof refresh === "function") {
      refresh();
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-64 md:w-[60%] lg:w-[60%]">
        <div className="grid grid-cols-2 items-center">
          <h2 className="text-center text-sm ">Pilih Tahun</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => setSelectedDate(date)}
            showYearPicker
            dateFormat="yyyy"
            className="w-full p-2 border text-center text-sm rounded-md"
          />
        </div>
        <div className="flex flex-col-reverse gap-2 mt-4 text-xs">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-200"
            onClick={onClose}
          >
            Batal
          </button>
          <button
            className="px-4 py-2 bg-hijau text-white rounded hover:bg-hijau-dark hover:opacity-80"
            onClick={handleSave}
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDate;
