import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ModalDate = ({ onClose, selectedDate, setSelectedDate, onSave, refresh }) => {
  const handleSave = () => {
    // Panggil fungsi onSave dengan tahun dari selectedDate
    onSave(selectedDate.getFullYear());

    // Jika refresh disediakan dan merupakan fungsi, panggil refresh
    if (typeof refresh === 'function') {
      refresh();
    }
    
    // Tutup modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-64">
        <h2 className="text-center text-lg mb-4">Pilih Tahun</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          showYearPicker
          dateFormat="yyyy"
          className="w-full px-4 py-2 border rounded-lg text-center"
        />
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
