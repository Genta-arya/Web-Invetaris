import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Mobile/components/Navbar";
import Header from "../../Mobile/components/Header";
import TablePreviewKir from "./components/TableKir";
import { FaPrint } from "react-icons/fa";
import { useReactToPrint } from "react-to-print";
import { useParams } from "react-router-dom";
import { getReportKir } from "../../Service/API/Ruangan/Service_Ruangan";
import handleError from "../../Utils/HandleError";
import LoadingGlobal from "../../Mobile/components/LoadingGlobal";

const PageReportKIR = () => {
  const [data, setData] = useState([]);
  const [length, setLength] = useState(0);
  const componentRef = useRef();
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await getReportKir(id);
      setData(response.data);
      setLength(response.data.inventaris.length);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading(false);
    }
  };

  // const fetchData = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await getReportKir(id);

  //     if (response.data && response.data.inventaris) {
  //       // Menggandakan data inventaris 5 kali menggunakan loop
  //       const multipliedInventaris = [];
  //       for (let i = 0; i < 8; i++) {
  //         multipliedInventaris.push(...response.data.inventaris);
  //       }

  //       const duplicatedData = {
  //         ...response.data,
  //         inventaris: multipliedInventaris,
  //       };

  //       setData(duplicatedData);
  //       setLength(duplicatedData.inventaris.length);
  //     }
  //   } catch (error) {
  //     handleError(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

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
          transform: ${length >= 14 ? "scale(1); " : ""}
    
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
      <Header text={`Laporan KIR`} />
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
          <p>Preview Laporan Kartu Inventaris Ruang</p>
        </div>
        <p className="md:hidden lg:hidden block  text-xs -mb-1 mt-2 text-red-500">
          * Preview Lebih baik dilihat menggunakan tampilan landscape / Dekstop
        </p>
      </div>
      <div className="bg-white flex justify-center flex-col items-center ">
        <TablePreviewKir
          data={data}
          componentRef={componentRef}
          length={length}
        />
      </div>
    </div>
  );
};

export default PageReportKIR;
