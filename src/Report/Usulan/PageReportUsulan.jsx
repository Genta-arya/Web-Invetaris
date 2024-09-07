import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Mobile/components/Navbar";
import Header from "../../Mobile/components/Header";

import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";

import LoadingGlobal from "../../Mobile/components/LoadingGlobal";
import { getReportUsulan } from "../../Service/API/Usulan/Service_Usulan";
import TablePreviewUsulan from "./components/TableUsulan";

const PageReportUsulan = () => {
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const componentRef = useRef();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getReportUsulan(id);
      setData(response.data);
      setLength(response.data.length);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    pageStyle: `
      @media print {
        @page {
          size: ${length >= 14 ? "landscape" : " portrait"};
       
          margin-top: 20mm;
        }
        body {
          transform: ${length >= 14 ? "scale(1); " : "scale(0.86)"}
    
        }
        .page-break { page-break-before: always; }
        .page-break-margin { margin-top: 20mm; }
      }
    `,
  });
  if (loading) return <LoadingGlobal />;

  return (
    <div>
      {" "}
      <Navbar />
      <Header text={`Laporan Usulan`} />
      <div className="flex justify-start mt-4 gap-4 lg:px-16 px-4 border-b-2  pb-4">
        <button
          onClick={handlePrint}
          disabled={length === 0}
          className={`bg-hijau text-xs text-white px-4 py-2 rounded flex items-center gap-2 ${
            length === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaPrint className="w-5 h-5" /> Cetak Laporan
        </button>
      </div>
      <div className="px-4">
        <div className="flex flex-col  mt-4 -mb-2 items-center font-bold">
          <p>Preview Laporan Pengadaan Barang</p>
        </div>
        <p className="md:hidden lg:hidden block  text-xs -mb-1 mt-2 text-red-500">
          * Preview Lebih baik dilihat menggunakan tampilan landscape / Dekstop
        </p>
      </div>
      <div className="bg-white flex justify-center flex-col items-center ">
        <TablePreviewUsulan componentRef={componentRef} data={data} length={length} />
      </div>
    </div>
  );
};

export default PageReportUsulan;
