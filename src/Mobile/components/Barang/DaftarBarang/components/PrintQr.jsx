import React, { useRef, useState, useEffect } from "react";
import Navbar from "../../../Navbar";
import Header from "../../../Header";
import { getPrintQrCode } from "../../../../../Service/API/Barang/Service_Barang"; // Pastikan pathnya benar
import { useReactToPrint } from "react-to-print";
import ContentPrint from "./ContentPrint";
import { FaPrint } from "react-icons/fa";

const PrintQr = () => {
  const [qrCodeData, setQrCodeData] = useState(null);
  const componentRef = useRef();

  // Fetch QR Code Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPrintQrCode();
        const data = response.data; // Sesuaikan dengan struktur data yang dikembalikan

        // Membuat array dengan 50 item
        // const repeatedData = [];
        // while (repeatedData.length < 50) {
        //   repeatedData.push(...data.slice(0, 50 - repeatedData.length));
        // }

        setQrCodeData(data);
      } catch (error) {
        console.error("Error fetching QR code data", error);
      }
    };

    fetchData();
  }, []);

  // Print Handler
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
          @media print {
            @page {
              size: landscape;
             
            }
            body {
            margin-top: 40mm;
            
            
            }
            .page-break { page-break-before: always; }
            .page-break-margin { margin-top: 10mm; }
          }
        `,
  });

  return (
    <main>
      <div className="lg:hidden md:block block"></div>

      <div>
        <nav>
          <Navbar />
        </nav>

        <div>
          <Header text={"Cetak Qr Code"} />
          <div className="mt-4 px-4 ">
            <button
              onClick={handlePrint}
              className="bg-hijau w-full text-white px-4 py-2 rounded-md text-xs"
            >
              <div className="flex items-center justify-center gap-2">
                <FaPrint />
                Cetak QR Code
              </div>
            </button>
          </div>
        </div>

        <div className="flex justify-center -mt-2">
          <div
            className="md:w-[220mm] scroll-container md:mt-8 lg:mt-12 lg:w-[240mm]  w-[95%] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8  lg:p-0 md:p-8 overflow-auto"
            style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
          >
            <ContentPrint componentRef={componentRef} qrCodeData={qrCodeData} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default PrintQr;
