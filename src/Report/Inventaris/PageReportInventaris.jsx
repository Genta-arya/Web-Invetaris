import React, { useRef, useEffect, useState } from "react";
import KOP from "../../assets/KOP.png";
import { useReactToPrint } from "react-to-print";
import { getReport } from "../../Service/API/Inventaris/Service_Inventaris";
import Navbar from "../../Mobile/components/Navbar";
import ModalDate from "../../Mobile/components/Inventaris/components/ModalDate";
import { FaPrint, FaFilter } from "react-icons/fa"; // Import ikon yang diperlukan
import Header from "../../Mobile/components/Header";
import useLoadingStore from "../../Utils/Zustand/useLoading";
import LoadingGlobal from "../../Mobile/components/LoadingGlobal";
import TablePreview from "./components/TablePreview";

const PageReportInventaris = () => {
  const componentRef = useRef();
  const [dataInventaris, setDataInventaris] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date());
  const { loading, setLoading } = useLoadingStore();
  const fetchData = async () => {
    try {
      setLoading(true);
      const year = selectedYear.getFullYear();
      const report = await getReport(year);
      // const multipliedReport = Array(5).fill(report).flat();
      setDataInventaris(report);
      // setDataInventaris(multipliedReport);
    } catch (error) {
      console.error("Error fetching data: ", error);
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
          size: ${dataInventaris.length >= 6 ? "landscape" : " portrait"};
          margin: 20mm;
        }
        body {
          transform: ${
            dataInventaris.length >= 6 ? "scale(1); " : "scale(0.86)"
          }
    
        }
        .page-break { page-break-before: always; }
        .page-break-margin { margin-top: 10mm; }
      }
    `,
  });

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleSaveDate = (date) => {
    setSelectedYear(date);
    setModalOpen(false);
  };

  const formatRupiah = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(value);
  };
  if (loading) return <LoadingGlobal />;
  return (
    <>
      <Navbar />
      <Header text={`Laporan Inventaris ${selectedYear.getFullYear()}`} />
      <div className="bg-white ">
        <div className="flex justify-start mt-4 gap-4 lg:px-16 px-4 border-b-2  pb-4">
          <button
            onClick={handleOpenModal}
            className="bg-hijau text-xs text-white px-4 py-2 rounded flex items-center gap-2"
          >
            <FaFilter className="w-5 h-5" /> Filter Tahun
          </button>
          <button
            onClick={handlePrint}
            disabled={dataInventaris.length === 0}
            className={`bg-hijau text-xs text-white px-4 py-2 rounded flex items-center gap-2 ${
              dataInventaris.length === 0 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <FaPrint className="w-5 h-5" /> Cetak Laporan
          </button>
        </div>
        <div className="px-4">
          <div className="flex flex-col  mt-2 items-center font-bold">
            <p>Preview Laporan Inventaris</p>
            <p className=" ">
              Tahun {selectedYear.getFullYear()}
            </p>
          </div>
          <p className="md:hidden lg:hidden block  text-xs -mb-1 text-red-500">
            * Preview Lebih baik dilihat menggunakan tampilan landscape /
            Dekstop
          </p>
        </div>
        <div className="flex justify-center flex-col items-center">
          <TablePreview
            KOP={KOP}
            length={dataInventaris.length}
            componentRef={componentRef}
            dataInventaris={dataInventaris}
            formatRupiah={formatRupiah}
          />
        </div>
      </div>
      {modalOpen && (
        <ModalDate
          refresh={fetchData}
          onClose={handleCloseModal}
          selectedDate={selectedYear}
          setSelectedDate={setSelectedYear}
          onSave={handleSaveDate}
        />
      )}
    </>
  );
};

export default PageReportInventaris;
