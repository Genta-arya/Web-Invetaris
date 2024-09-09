import React from "react";
import LoadingGlobal from "../../../LoadingGlobal";
import icon from "../../../../../assets/akcaya.jpeg";

const ContentPrint = ({ componentRef, qrCodeData }) => {
  return (
    <div ref={componentRef} className="p-6 bg-gray-50">
      {qrCodeData ? (
        <table className="w-full  border">
          <tbody>
            {qrCodeData.map((qrCode, index) => (
              <tr key={index}>
                {/* Logo Akcaya */}
                <td className="w-1/6 p-4 border border-black bg-white">
                  <div className="flex justify-center">
                    <img
                      src={icon}
                      alt="Akcaya Logo"
                      className="w-24 h-24 "
                    />
                  </div>
                </td>

                {/* Detail Barang */}
                <td className="w-2/3 p-3 border border-black bg-white text-center">
                  <div className=" ">
                    <p className="text-md font-semibold text-gray-700  border-b border-black ">
                      <span className="font-bold text-lg uppercase">{qrCode.namaBarang}</span>
                    </p>
                    <p className="text-sm text-gray-600  border-b border-black ">
                      <span className="font-normal">
                        {qrCode.kodeBarang || "-"}
                      </span>
                    </p>
                    <p className="text-sm text-gray-600  border-b border-black ">
                       <span className="font-semibold"> Tahun {qrCode.tahun}</span>
                    </p>
                    <p className="text-lg font-bold  text-gray-600 uppercase">
                      SMK Negeri 2 Ketapang
                    </p>
                  </div>
                </td>

                {/* QR Code */}
                <td className="w-1/6 p-4 border border-black bg-white">
                  <div className="flex justify-center">
                    <img
                      src={qrCode.imageBarcode}
                      alt={`QR Code ${index}`}
                      className="w-24 h-24 "
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <LoadingGlobal />
      )}
    </div>
  );
};

export default ContentPrint;
