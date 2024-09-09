import React from "react";
import { FaArrowRight, FaPrint } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ModalPreview = ({ isOpen, onClose, imageSrc ,id }) => {
  if (!isOpen) return null;
 const navigate = useNavigate()
  const handlePrint = () => {
    const printWindow = window.open("", "", "height=600,width=800");
    printWindow.document.write("<html><head><title>Print Sekarang</title>");
    printWindow.document.write("</head><body >");
    printWindow.document.write(
      `<img src="${imageSrc}" style="width: 100%;" />`
    );
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  const handleLihat = () => {
   navigate(`/detail/${id}`)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="bg-white p-4 rounded shadow-lg relative lg:w-[50%]">
        <button
          onClick={onClose}
          className="absolute top-2 left-3 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        <div className="flex justify-center">

        <img
          src={imageSrc}
          alt="Barcode Preview"
          className="max-w-xs max-h-80 lg:max-w-full"
        />
        </div>
        <button
          onClick={handlePrint}
          className="mt-4 px-4 py-2 w-full text-xs bg-hijau text-white rounded hover:opacity-80"
        >
          <div className="flex items-center gap-2 justify-center">
            <FaPrint />
            <h1>Print</h1>
          </div>
          <div>
          </div>
        </button>

           <button
          onClick={handleLihat}
          className="mt-2 px-4 py-2 w-full text-xs border-hijau border text-gray-800 rounded hover:opacity-80"
        >
          <div className="flex items-center gap-2 justify-center">
            <h1 className="font-bold">Lihat</h1>
            <FaArrowRight />
          </div>
          <div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ModalPreview;
