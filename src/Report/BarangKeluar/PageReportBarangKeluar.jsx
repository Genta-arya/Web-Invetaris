import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Mobile/components/Navbar";
import Header from "../../Mobile/components/Header";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import handleError from "../../Utils/HandleError";
import { getReportBarangKeluar } from "../../Service/API/Barang/Service_Barang";
import LoadingGlobal from "../../Mobile/components/LoadingGlobal";
import TableBarangKeluar from "./components/TableBarangKeluar";

const PageReportBarangKeluar = () => {
  const componentRef = useRef();
  const [data, setData] = useState([]);
  const [tahun, setTahun] = useState(null);
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getReportBarangKeluar();
      setData(response.data);
      setTahun(response.tahun);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
          @media print {
            @page {
              size: portrait;
           
              margin-top: 10mm;
            }
            body {
            
           
        
            }
            .page-break { page-break-before: always; }
            .page-break-margin { margin-top: 20mm; }
          }
        `,
  });

  useEffect(() => {
    fetchData();
  }, []);
  if (loading) return <LoadingGlobal />;
  return (
    <div>
      {" "}
      <Navbar />
      <Header text={`Laporan KIR`} />
      <div className="flex justify-start mt-4 gap-4 lg:px-16 px-4 border-b-2  pb-4">
        <button
          onClick={handlePrint}
          disabled={data.length === 0}
          className={`bg-hijau text-xs w-full text-white px-4 py-2 rounded flex justify-center items-center gap-2 ${
            data.length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center  justify-center gap-2">
            {" "}
            <FaPrint className="w-5 h-5" />
            <p>Cetak Laporan</p>
          </div>
        </button>
      </div>
      <div className="px-4">
        <div className="flex flex-col  mt-4 -mb-2 items-center font-bold">
          <p>Preview Laporan Barang Keluar Tahun {tahun}</p>
        </div>
        <p className="md:hidden lg:hidden block  text-xs -mb-1 mt-2 text-red-500">
          * Preview Lebih baik dilihat menggunakan tampilan landscape / Dekstop
        </p>
      </div>
      <div className="bg-white flex justify-center flex-col items-center ">
        <div
          className="md:w-[220mm] scroll-container md:mt-8 text-xs  lg:mt-12 lg:w-[240mm] w-[95%] min-h-[297mm] border border-gray-300 rounded-lg mt-4 mb-12 p-8 lg:p-12 print:p-0 md:p-8 overflow-auto"
          style={{ boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.2)" }}
        >
          <div ref={componentRef} className="p-4 print:mt-5">
            <TableBarangKeluar data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageReportBarangKeluar;
