import React from "react";
import LoadingGlobal from "../../../LoadingGlobal";

const ContentPrint = ({ componentRef, qrCodeData }) => {
  return (
    <div ref={componentRef} className="p-6 grid grid-cols-5 gap-4 bg-gray-50">
      {qrCodeData ? (
        qrCodeData.map((qrCode, index) => (
          <div
            key={index}
            className="rounded-lg p-4 flex flex-col items-center"
          >
            <img
              src={qrCode.imageBarcode}
              alt={`QR Code ${index}`}
              className="w-32 h-32 object-contain mb-2"
            />
            <p className="text-sm font-semibold text-gray-700 truncate w-32 text-center">
              {qrCode.namaBarang}
            </p>
          </div>
        ))
      ) : (
        <LoadingGlobal />
      )}
    </div>
  );
};

export default ContentPrint;
