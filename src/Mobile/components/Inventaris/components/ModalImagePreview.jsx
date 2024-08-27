import React from "react";
import { FaArrowRight, FaPrint } from "react-icons/fa";

const ModalImagePreview = ({ imageSrc, onClose }) => {
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
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded shadow-lg relative lg:w-[50%]">
       <div className="flex justify-center">  

        <img
          src={imageSrc}
          alt="Barcode Preview"
          className="max-w-xs max-h-80 lg:w-96 "
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
   
        </button>
        <button
          onClick={onClose}
          className="mt-2 px-4 py-2 w-full text-xs border border-hijau text-gray-600 font-bold rounded hover:opacity-80"
        >
          <div className="flex items-center gap-2 justify-center">
           
            <h1>Tutup</h1>
          </div>
   
        </button>
      </div>
    </div>
  );
};

export default ModalImagePreview;
